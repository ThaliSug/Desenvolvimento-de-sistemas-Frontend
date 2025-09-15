import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Fab,
  Chip,
  Paper,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Tv as TvIcon,
  Visibility as ViewIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  Category as CategoryIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { seriesAPI, CATEGORIES } from '../services/seriesAPI';
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState({
    total: 0,
    totalSeasons: 0,
    categories: {},
    recentlyWatched: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const series = await seriesAPI.getAllSeries();

      // Calcular estatísticas
      const total = series.length;
      const totalSeasons = series.reduce((sum, serie) => sum + (serie.numeroTemporadas || 0), 0);

      // Contar por categoria
      const categories = {};
      series.forEach(serie => {
        if (serie.categoria) {
          categories[serie.categoria] = (categories[serie.categoria] || 0) + 1;
        }
      });

      // Séries assistidas recentemente (últimas 3)
      const recentlyWatched = series
        .filter(serie => serie.dataAssistida)
        .sort((a, b) => new Date(b.dataAssistida) - new Date(a.dataAssistida))
        .slice(0, 3);

      setStats({
        total,
        totalSeasons,
        categories,
        recentlyWatched
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
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

  const quickStats = [
    {
      title: 'Total de Séries',
      value: stats.total,
      icon: <TvIcon sx={{ fontSize: 40 }} />,
      color: '#e50914',
      gradient: 'linear-gradient(45deg, #e50914, #ff1744)'
    },
    {
      title: 'Total de Temporadas',
      value: stats.totalSeasons,
      icon: <ScheduleIcon sx={{ fontSize: 40 }} />,
      color: '#ffd700',
      gradient: 'linear-gradient(45deg, #ffd700, #ffeb3b)'
    },
    {
      title: 'Categorias Diferentes',
      value: Object.keys(stats.categories).length,
      icon: <CategoryIcon sx={{ fontSize: 40 }} />,
      color: '#4ecdc4',
      gradient: 'linear-gradient(45deg, #4ecdc4, #26a69a)'
    }
  ];

  return (
    <div className="home-container">
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box className="hero-section" sx={{ textAlign: 'center', mb: 6 }}>
          <div className="hero-content">
            <TvIcon className="hero-icon pulse" sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            <Typography variant="h2" component="h1" className="hero-title" gutterBottom>
              Series Journal
            </Typography>
            <Typography variant="h5" color="text.secondary" className="hero-subtitle" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              Gerencie suas séries assistidas de uma forma fácil e intuitiva. 
              Mantenha um registro completo de tudo que você já assistiu!
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/add"
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                className="hero-button primary"
              >
                Cadastrar Série
              </Button>
              <Button
                component={Link}
                to="/list"
                variant="outlined"
                size="large"
                startIcon={<ViewIcon />}
                className="hero-button secondary"
              >
                Ver Todas as Séries
              </Button>
            </Box>
          </div>
        </Box>

        {/* Estatísticas Rápidas */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
            <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Suas Estatísticas
          </Typography>

          <Grid container spacing={3}>
            {quickStats.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="stat-card" sx={{ 
                  background: stat.gradient,
                  color: 'white',
                  textAlign: 'center',
                  py: 3
                }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {loading ? '...' : stat.value}
                    </Typography>
                    <Typography variant="h6" component="div">
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Categorias Populares */}
        {Object.keys(stats.categories).length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
              <CategoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Suas Categorias Favoritas
            </Typography>

            <Paper sx={{ p: 3, background: 'rgba(30, 30, 30, 0.5)', backdropFilter: 'blur(10px)' }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                {Object.entries(stats.categories)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 10)
                  .map(([category, count]) => (
                    <Chip
                      key={category}
                      label={`${category} (${count})`}
                      sx={{
                        backgroundColor: getCategoryColor(category),
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        py: 2,
                        px: 1,
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        },
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
              </Box>
            </Paper>
          </Box>
        )}

        {/* Séries Assistidas Recentemente */}
        {stats.recentlyWatched.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
              <PlayIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Assistidas Recentemente
            </Typography>

            <Grid container spacing={3}>
              {stats.recentlyWatched.map((serie, index) => (
                <Grid item xs={12} md={4} key={serie.id}>
                  <Card className="recent-serie-card">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', flex: 1, mr: 1 }}>
                          {serie.titulo}
                        </Typography>
                        <Chip
                          label={serie.categoria}
                          size="small"
                          sx={{
                            backgroundColor: getCategoryColor(serie.categoria),
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Diretor:</strong> {serie.diretor}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Temporadas:</strong> {serie.numeroTemporadas}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Assistida em:</strong> {new Date(serie.dataAssistida).toLocaleDateString('pt-BR')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Call to Action - Se não tem séries */}
        {stats.total === 0 && !loading && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Paper sx={{ p: 6, background: 'rgba(30, 30, 30, 0.5)', backdropFilter: 'blur(10px)' }}>
              <TvIcon sx={{ fontSize: 100, color: 'text.secondary', mb: 3 }} />
              <Typography variant="h4" gutterBottom>
                Comece sua jornada!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
                Você ainda não cadastrou nenhuma série. Que tal começar adicionando 
                sua série favorita e criar seu próprio catálogo personalizado?
              </Typography>
              <Button
                component={Link}
                to="/add"
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                sx={{ px: 4, py: 2 }}
              >
                Cadastrar Primeira Série
              </Button>
            </Paper>
          </Box>
        )}
      </Container>

      {/* FAB para adicionar série */}
      <Fab
        component={Link}
        to="/add"
        color="primary"
        className="floating-add-button"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: 'linear-gradient(45deg, #e50914, #ff1744)',
          '&:hover': {
            background: 'linear-gradient(45deg, #ff1744, #e50914)',
            transform: 'scale(1.1)',
          }
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Home;
