import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SerieForm from '../components/SerieForm/SerieForm';

const AddSerie = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState({ show: false, message: '' });

  const handleSuccess = (newSerie) => {
    setSuccess({ 
      show: true, 
      message: `Série "${newSerie.titulo}" cadastrada com sucesso!` 
    });

    // Redirecionar para a lista após alguns segundos
    setTimeout(() => {
      navigate('/list');
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleCloseSuccess = () => {
    setSuccess({ show: false, message: '' });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <AddIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Cadastrar Nova Série
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Adicione uma nova série ao seu catálogo pessoal
        </Typography>
      </Box>

      <SerieForm 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        mode="create"
      />

      <Snackbar 
        open={success.show} 
        autoHideDuration={6000} 
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSuccess} 
          severity="success" 
          sx={{ width: '100%' }}
          iconMapping={{
            success: <CheckCircleIcon fontSize="inherit" />,
          }}
        >
          {success.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddSerie;
