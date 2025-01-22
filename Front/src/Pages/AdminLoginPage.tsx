import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import './Login.css';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminId: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:1337/api/loginAdmin', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('admin', JSON.stringify(data));
        navigate('/admin/dashboard');
        window.location.reload();
      } else {
        setError(data.message || 'Credenciales de administrador inválidas');
      }
    } catch (err) {
      setError('Error al intentar iniciar sesión como administrador');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#1a237e',
          padding: 4,
          borderRadius: 3
        }}
      >
        <AdminPanelSettingsIcon 
          sx={{ 
            fontSize: 60, 
            color: '#fff',
            marginBottom: 2 
          }} 
        />
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: 3
          }}
        >
          Panel Administrativo
        </Typography>
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ 
            width: '100%',
            backgroundColor: '#fff',
            padding: 3,
            borderRadius: 2
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="ID Administrador"
            name="adminId"
            placeholder="ECO-ADM-XXX"
            autoFocus
            value={formData.adminId}
            onChange={(e) => setFormData({...formData, adminId: e.target.value})}
            sx={{ backgroundColor: '#f5f5f5' }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            sx={{ backgroundColor: '#f5f5f5' }}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              fontFamily: 'poppins, sans-serif',
              fontSize: '1rem',
              backgroundColor: '#4caf50',
              '&:hover': {
                backgroundColor: '#388e3c'
              },
              padding: 1.5
            }}
          >
            Acceder como Administrador
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLoginPage;
