import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Fab,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  List as ListIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import SerieList from '../components/SerieList/SerieList';

const SeriesList = () => {
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const handleCloseAlert = () => {
    setAlert({ show: false, type: '', message: '' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <ListIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Lista de Séries
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Gerencie todas as suas séries assistidas
        </Typography>
      </Box>

      <SerieList />

      {/* FAB para adicionar nova série */}
      <Fab
        component={Link}
        to="/add"
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: 'linear-gradient(45deg, #e50914, #ff1744)',
          '&:hover': {
            background: 'linear-gradient(45deg, #ff1744, #e50914)',
            transform: 'scale(1.1)',
            boxShadow: '0 10px 30px rgba(229, 9, 20, 0.5)',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <AddIcon />
      </Fab>

      <Snackbar 
        open={alert.show} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.type} 
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SeriesList;
