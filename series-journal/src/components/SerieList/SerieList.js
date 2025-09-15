import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  DateRange as DateIcon,
  Movie as MovieIcon,
  Star as StarIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { seriesAPI, CATEGORIES } from '../../services/seriesAPI';
import SerieForm from '../SerieForm/SerieForm';
import './SerieList.css';

const SerieList = ({ series: propSeries, onSeriesChange }) => {
  const [series, setSeries] = useState(propSeries || []);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [loading, setLoading] = useState(!propSeries);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, serie: null });
  const [editDialog, setEditDialog] = useState({ open: false, serie: null });
  const [viewDialog, setViewDialog] = useState({ open: false, serie: null });
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Carregar séries se não foram passadas via props
  useEffect(() => {
    if (!propSeries) {
      loadSeries();
    }
  }, [propSeries]);

  // Aplicar filtros sempre que mudarem
  useEffect(() => {
    applyFilters();
  }, [series, searchTerm, selectedCategory]);

  const loadSeries = async () => {
    try {
      setLoading(true);
      const data = await seriesAPI.getAllSeries();
      console.log('🔍 Dados recebidos da API:', data); // Debug
      
      // Normalizar os dados para garantir compatibilidade
      const normalizedData = Array.isArray(data) ? data.map(serie => ({
        // Tentar diferentes possibilidades de nomes de campos
        id: serie.id,
        titulo: serie.titulo || serie.title || serie.name || 'Título não informado',
        numeroTemporadas: serie.numeroTemporadas || serie.seasons || serie.temporadas || 0,
        dataLancamento: serie.dataLancamento || serie.releaseDate || serie.dataLanc || null,
        diretor: serie.diretor || serie.director || 'Diretor não informado',
        produtora: serie.produtora || serie.producer || serie.production || serie.studio || 'Produtora não informada',
        categoria: serie.categoria || serie.category || serie.genre || 'Drama',
        dataAssistida: serie.dataAssistida || serie.watchedAt || serie.dataAssist || null,
        observacoes: serie.observacoes || serie.notes || serie.description || ''
      })) : [];
      
      console.log('🔄 Dados normalizados:', normalizedData); // Debug
      setSeries(normalizedData);
    } catch (error) {
      console.error('❌ Erro ao carregar séries:', error);
      showAlert('error', 'Erro ao carregar séries: ' + error.message);
      setSeries([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...series];

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(serie =>
        (serie.titulo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (serie.diretor || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (serie.produtora || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoria
    if (selectedCategory) {
      filtered = filtered.filter(serie => serie.categoria === selectedCategory);
    }

    setFilteredSeries(filtered);
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
  };

  const handleEdit = (serie) => {
    setEditDialog({ open: true, serie });
  };

  const handleDelete = async () => {
    try {
      await seriesAPI.deleteSerie(deleteDialog.serie.id);
      const updatedSeries = series.filter(s => s.id !== deleteDialog.serie.id);
      setSeries(updatedSeries);
      if (onSeriesChange) onSeriesChange(updatedSeries);
      showAlert('success', 'Série excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir série:', error);
      showAlert('error', 'Erro ao excluir série: ' + error.message);
    } finally {
      setDeleteDialog({ open: false, serie: null });
    }
  };

  const handleEditSuccess = (updatedSerie) => {
    const updatedSeries = series.map(s => 
      s.id === updatedSerie.id ? updatedSerie : s
    );
    setSeries(updatedSeries);
    if (onSeriesChange) onSeriesChange(updatedSeries);
    setEditDialog({ open: false, serie: null });
  };

  const handleView = (serie) => {
    setViewDialog({ open: true, serie });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setFilterAnchor(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Drama': '#ff6b6b',
      'Comédia': '#4ecdc4',
      'Ação': '#45b7d1',
      'Suspense': '#96ceb4',
      'Terror': '#ff9ff3',
      'Ficção Científica': '#54a0ff',
      'Fantasia': '#5f27cd',
      'Romance': '#ff9ff3',
      'Documentário': '#feca57',
      'Animação': '#48dbfb',
      'Crime': '#ff6348',
      'Mistério': '#a55eea',
      'Aventura': '#26de81',
    };
    return colors[category] || '#78909c';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Carregando séries...
        </Typography>
      </Box>
    );
  }

  return (
    <div className="serie-list-container">
      {alert.show && (
        <Alert 
          severity={alert.type} 
          onClose={() => setAlert({ show: false, type: '', message: '' })}
          sx={{ mb: 3 }}
        >
          {alert.message}
        </Alert>
      )}

      {/* Cabeçalho e Filtros */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
          <MovieIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Minhas Séries ({filteredSeries.length})
        </Typography>

        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar por título, diretor ou produtora..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchTerm('')} size="small">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={(e) => setFilterAnchor(e.currentTarget)}
              fullWidth
              sx={{ height: 56 }}
            >
              {selectedCategory || 'Todas as Categorias'}
            </Button>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Button
              variant="text"
              onClick={clearFilters}
              disabled={!searchTerm && !selectedCategory}
              fullWidth
              sx={{ height: 56 }}
            >
              Limpar
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Debug: Mostrar dados brutos 
      {process.env.NODE_ENV === 'development' && (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
          <Typography variant="caption" component="div">
            🐛 DEBUG - Total de séries: {series.length} | Filtradas: {filteredSeries.length}
          </Typography>
          {series.length > 0 && (
            <Typography variant="caption" component="div">
              📊 Primeira série: {JSON.stringify(series[0], null, 2)}
            </Typography>
          )}
        </Box>
      )}*/}
    
      {/* Lista de Séries */}
      {filteredSeries.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <MovieIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {series.length === 0 ? 'Nenhuma série cadastrada' : 'Nenhuma série encontrada'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {series.length === 0 
              ? 'Comece adicionando suas primeiras séries!'
              : 'Tente ajustar os filtros de busca.'
            }
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredSeries.map((serie, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={serie.id || index}>
              <Card className="serie-card" elevation={3}>
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2" sx={{ 
                      fontWeight: 'bold',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      flex: 1,
                      mr: 1,
                    }}>
                      {serie.titulo || 'Título não disponível'}
                    </Typography>
                    <Chip
                      label={serie.categoria || 'Drama'}
                      size="small"
                      sx={{
                        backgroundColor: getCategoryColor(serie.categoria),
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Diretor:</strong> {serie.diretor || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Produtora:</strong> {serie.produtora || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Temporadas:</strong> {serie.numeroTemporadas || 'N/A'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', fontSize: '0.75rem' }}>
                    <Chip
                      icon={<DateIcon />}
                      label={`Lançamento: ${formatDate(serie.dataLancamento)}`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<StarIcon />}
                      label={`Assistida: ${formatDate(serie.dataAssistida)}`}
                      size="small"
                      variant="outlined"
                      color="secondary"
                    />
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'center', pt: 0 }}>
                  <Tooltip title="Visualizar detalhes">
                    <IconButton onClick={() => handleView(serie)} color="info">
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar série">
                    <IconButton onClick={() => handleEdit(serie)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir série">
                    <IconButton 
                      onClick={() => setDeleteDialog({ open: true, serie })}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Menu de Filtros */}
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={() => setFilterAnchor(null)}
      >
        <MenuItem onClick={() => { setSelectedCategory(''); setFilterAnchor(null); }}>
          Todas as Categorias
        </MenuItem>
        {CATEGORIES.map((category) => (
          <MenuItem
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setFilterAnchor(null);
            }}
            selected={selectedCategory === category}
          >
            {category}
          </MenuItem>
        ))}
      </Menu>

      {/* Dialog de Exclusão */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, serie: null })}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir a série "{deleteDialog.serie?.titulo}"?
            Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, serie: null })}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Edição */}
      <Dialog 
        open={editDialog.open} 
        onClose={() => setEditDialog({ open: false, serie: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          {editDialog.serie && (
            <SerieForm
              serieData={editDialog.serie}
              mode="edit"
              onSuccess={handleEditSuccess}
              onCancel={() => setEditDialog({ open: false, serie: null })}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Visualização */}
      <Dialog 
        open={viewDialog.open} 
        onClose={() => setViewDialog({ open: false, serie: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <MovieIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          {viewDialog.serie?.titulo}
        </DialogTitle>
        <DialogContent>
          {viewDialog.serie && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Diretor</Typography>
                <Typography variant="body1">{viewDialog.serie.diretor}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Produtora</Typography>
                <Typography variant="body1">{viewDialog.serie.produtora}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Categoria</Typography>
                <Chip 
                  label={viewDialog.serie.categoria}
                  sx={{ backgroundColor: getCategoryColor(viewDialog.serie.categoria), color: 'white' }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Temporadas</Typography>
                <Typography variant="body1">{viewDialog.serie.numeroTemporadas}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Data de Lançamento</Typography>
                <Typography variant="body1">{formatDate(viewDialog.serie.dataLancamento)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Data que Assistiu</Typography>
                <Typography variant="body1">{formatDate(viewDialog.serie.dataAssistida)}</Typography>
              </Grid>
              {viewDialog.serie.observacoes && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Observações</Typography>
                  <Typography variant="body1">{viewDialog.serie.observacoes}</Typography>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialog({ open: false, serie: null })}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SerieList;
