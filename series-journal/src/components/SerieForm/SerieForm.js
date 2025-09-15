import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
  Chip,
  Divider,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Tv as TvIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { seriesAPI, seriesValidation, CATEGORIES } from '../../services/seriesAPI';
import './SerieForm.css';

const SerieForm = ({ 
  serieData = null, 
  onSuccess, 
  onCancel,
  mode = 'create' // 'create' ou 'edit'
}) => {
  const [formData, setFormData] = useState({
    titulo: '',
    numeroTemporadas: '',
    dataLancamento: null,
    diretor: '',
    produtora: '',
    categoria: '',
    dataAssistida: null,
    observacoes: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Carregar dados para edição
  useEffect(() => {
    if (serieData && mode === 'edit') {
      setFormData({
        ...serieData,
        dataLancamento: serieData.dataLancamento ? new Date(serieData.dataLancamento) : null,
        dataAssistida: serieData.dataAssistida ? new Date(serieData.dataAssistida) : null,
      });
    }
  }, [serieData, mode]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpar erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar dados
    const validation = seriesValidation.validateSerieData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showAlert('error', 'Por favor, corrija os erros no formulário');
      return;
    }

    setLoading(true);

    try {
      // Preparar dados para envio
      const dataToSend = {
        ...formData,
        numeroTemporadas: parseInt(formData.numeroTemporadas),
        dataLancamento: formData.dataLancamento?.toISOString().split('T')[0],
        dataAssistida: formData.dataAssistida?.toISOString().split('T')[0],
      };

      let result;
      if (mode === 'edit' && serieData?.id) {
        result = await seriesAPI.updateSerie(serieData.id, dataToSend);
        showAlert('success', 'Série atualizada com sucesso!');
      } else {
        result = await seriesAPI.createSerie(dataToSend);
        showAlert('success', 'Série cadastrada com sucesso!');
      }

      // Resetar formulário se for criação
      if (mode === 'create') {
        setFormData({
          titulo: '',
          numeroTemporadas: '',
          dataLancamento: null,
          diretor: '',
          produtora: '',
          categoria: '',
          dataAssistida: null,
          observacoes: '',
        });
      }

      if (onSuccess) onSuccess(result);

    } catch (error) {
      console.error('Erro ao salvar série:', error);
      showAlert('error', error.message || 'Erro ao salvar série');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Resetar formulário
      setFormData({
        titulo: '',
        numeroTemporadas: '',
        dataLancamento: null,
        diretor: '',
        produtora: '',
        categoria: '',
        dataAssistida: null,
        observacoes: '',
      });
      setErrors({});
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Paper className="serie-form-container" elevation={3}>
        {alert.show && (
          <Alert 
            severity={alert.type} 
            onClose={() => setAlert({ show: false, type: '', message: '' })}
            sx={{ mb: 2 }}
          >
            {alert.message}
          </Alert>
        )}

        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <TvIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            {mode === 'edit' ? 'Editar Série' : 'Cadastrar Nova Série'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {mode === 'edit' 
              ? 'Atualize as informações da série' 
              : 'Preencha os dados da série que você assistiu'
            }
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </Box>

        <form onSubmit={handleSubmit} className="serie-form">
          <Grid container spacing={3}>
            {/* Título */}
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Título da Série *"
                value={formData.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                error={!!errors.titulo}
                helperText={errors.titulo}
                variant="outlined"
              />
            </Grid>

            {/* Número de Temporadas */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Número de Temporadas *"
                value={formData.numeroTemporadas}
                onChange={(e) => handleInputChange('numeroTemporadas', e.target.value)}
                error={!!errors.numeroTemporadas}
                helperText={errors.numeroTemporadas}
                inputProps={{ min: 1, max: 50 }}
              />
            </Grid>

            {/* Data de Lançamento */}
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Data de Lançamento *"
                value={formData.dataLancamento}
                onChange={(date) => handleInputChange('dataLancamento', date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.dataLancamento}
                    helperText={errors.dataLancamento}
                  />
                )}
                maxDate={new Date()}
              />
            </Grid>

            {/* Data que Assistiu */}
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Data que Assistiu *"
                value={formData.dataAssistida}
                onChange={(date) => handleInputChange('dataAssistida', date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.dataAssistida}
                    helperText={errors.dataAssistida}
                  />
                )}
                maxDate={new Date()}
              />
            </Grid>

            {/* Diretor */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Diretor *"
                value={formData.diretor}
                onChange={(e) => handleInputChange('diretor', e.target.value)}
                error={!!errors.diretor}
                helperText={errors.diretor}
              />
            </Grid>

            {/* Produtora */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Produtora *"
                value={formData.produtora}
                onChange={(e) => handleInputChange('produtora', e.target.value)}
                error={!!errors.produtora}
                helperText={errors.produtora}
              />
            </Grid>

            {/* Categoria */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Categoria *"
                value={formData.categoria}
                onChange={(e) => handleInputChange('categoria', e.target.value)}
                error={!!errors.categoria}
                helperText={errors.categoria}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Observações */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Observações (Opcional)"
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                placeholder="Adicione comentários, avaliação pessoal, etc."
              />
            </Grid>

            {/* Botões */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', pt: 2 }}>
                <Button
                  type="button"
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  size="large"
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={loading}
                  size="large"
                  sx={{ minWidth: 140 }}
                >
                  {loading ? 'Salvando...' : (mode === 'edit' ? 'Atualizar' : 'Cadastrar')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            * Campos obrigatórios
          </Typography>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default SerieForm;
