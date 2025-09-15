import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import {
  Tv as TvIcon,
  Code as CodeIcon,
  Palette as PaletteIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Accessibility as AccessibilityIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Check as CheckIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const About = () => {
  const technologies = [
    { name: 'React 18', color: '#61dafb' },
    { name: 'Material-UI', color: '#0081cb' },
    { name: 'JavaScript ES6+', color: '#f7df1e' },
    { name: 'CSS3 & Animations', color: '#1572b6' },
    { name: 'Axios', color: '#671ddf' },
    { name: 'React Router', color: '#ca4245' },
    { name: 'Date-fns', color: '#770c56' },
    { name: 'Responsive Design', color: '#38b2ac' },
  ];

  const features = [
    'Interface moderna e responsiva',
    'Sistema CRUD completo (Create, Read, Update, Delete)',
    'Busca e filtros avançados',
    'Validação de formulários em tempo real',
    'Feedback visual e mensagens de status',
    'Visualização detalhada de séries',
    'Estatísticas personalizadas',
    'Design acessível e inclusivo',
    'Animações suaves e transições',
    'Tema escuro otimizado para visualização',
  ];

  const highlights = [
    {
      title: 'Design Moderno',
      description: 'Interface elegante com tema escuro e efeitos visuais',
      icon: <PaletteIcon />,
      color: '#e91e63',
    },
    {
      title: 'Performance',
      description: 'Otimizado para velocidade e responsividade',
      icon: <SpeedIcon />,
      color: '#4caf50',
    },
    {
      title: 'Segurança',
      description: 'Validações robustas e tratamento de erros',
      icon: <SecurityIcon />,
      color: '#ff9800',
    },
    {
      title: 'Acessibilidade',
      description: 'Compatível com leitores de tela e navegação por teclado',
      icon: <AccessibilityIcon />,
      color: '#2196f3',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <TvIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h2" component="h1" gutterBottom>
          Sobre o Series Journal
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Um sistema moderno e intuitivo para gerenciar suas séries assistidas
        </Typography>
      </Box>

      {/* Descrição Principal */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.9))',
        border: '1px solid rgba(229, 9, 20, 0.2)',
        borderRadius: 3
      }}>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          O <strong>Series Journal</strong> é um projeto desenvolvido para a disciplina de 
          <strong> Desenvolvimento de Sistemas Frontend</strong>, que permite aos usuários 
          catalogar e organizar todas as séries que assistiram de forma prática e visual.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          Com uma interface moderna e responsiva, o sistema oferece funcionalidades completas 
          de CRUD (Create, Read, Update, Delete), sistema de busca avançada, filtros por categoria, 
          visualização detalhada e estatísticas personalizadas.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          Desenvolvido seguindo as melhores práticas de desenvolvimento frontend, 
          o projeto utiliza tecnologias modernas e oferece uma experiência de usuário 
          excepcional em qualquer dispositivo.
        </Typography>
      </Paper>

      {/* Destaques */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          <StarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Principais Características
        </Typography>

        <Grid container spacing={3}>
          {highlights.map((highlight, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                height: '100%',
                background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.8))',
                border: `1px solid ${highlight.color}30`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 10px 30px ${highlight.color}40`,
                  borderColor: `${highlight.color}60`,
                }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ 
                      color: highlight.color, 
                      mr: 2,
                      backgroundColor: `${highlight.color}20`,
                      borderRadius: 2,
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {highlight.icon}
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                      {highlight.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {highlight.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tecnologias */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Tecnologias Utilizadas
        </Typography>

        <Paper sx={{ 
          p: 3, 
          background: 'rgba(30, 30, 30, 0.5)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 3
        }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {technologies.map((tech, index) => (
              <Chip
                key={index}
                label={tech.name}
                sx={{
                  backgroundColor: tech.color + '20',
                  color: tech.color,
                  border: `1px solid ${tech.color}40`,
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  py: 2.5,
                  px: 1,
                  '&:hover': {
                    backgroundColor: tech.color + '30',
                    transform: 'scale(1.05)',
                    boxShadow: `0 4px 20px ${tech.color}40`,
                  },
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Funcionalidades */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          <CheckIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Funcionalidades Implementadas
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 3, 
              height: '100%',
              background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.8))',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              borderRadius: 3
            }}>
              <List>
                {features.slice(0, 5).map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 3, 
              height: '100%',
              background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.8))',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              borderRadius: 3
            }}>
              <List>
                {features.slice(5).map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Paper sx={{ 
          p: 4, 
          background: 'linear-gradient(45deg, rgba(229, 9, 20, 0.1), rgba(255, 215, 0, 0.1))',
          border: '1px solid rgba(229, 9, 20, 0.3)',
          borderRadius: 3
        }}>
          <Typography variant="h5" gutterBottom>
            Pronto para começar?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Explore todas as funcionalidades e comece a organizar suas séries hoje mesmo!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/add"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #e50914, #ff1744)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #ff1744, #e50914)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(229, 9, 20, 0.4)',
                }
              }}
            >
              Cadastrar Série
            </Button>
            <Button
              component={Link}
              to="/list"
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#ffd700',
                color: '#ffd700',
                '&:hover': {
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  borderColor: '#ffd700',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Ver Todas as Séries
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', pt: 4, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Typography variant="body2" color="text.secondary">
          Desenvolvido com ❤️ para a disciplina de Desenvolvimento de Sistemas Frontend
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          © 2025 Series Journal - Projeto Acadêmico
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
