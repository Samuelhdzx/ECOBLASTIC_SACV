import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import './Register.css';

const AdminRegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    adminId: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:1337/api/createAdmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/loginAdmin');
      } else {
        setError(Array.isArray(data.message) ? data.message[0] : data.message);
      }
    } catch (err) {
      setError('Error en el registro de administrador');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          padding: 3,
          borderRadius: 2,
          justifyItems: 'center'
        }}
      >
        <i className="fi fi-rr-user-add" style={{marginLeft:'5%'}}></i>
        <Typography fontSize={'1.5em'} color="primary">
          Registro de Administrador
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nombre de administrador"
            name="username"
            autoFocus
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="ID de Administrador"
            name="adminId"
            placeholder="ECO-ADM-XXX"
            helperText="Formato: ECO-ADM-001"
            value={formData.adminId}
            onChange={(e) => setFormData({...formData, adminId: e.target.value})}
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
              fontFamily:"Poppins",
              fontSize: "0.9rem"
            }}
          >
            Registrar Administrador
          </Button>

          {/* Nueva sección de login */}
          <Box sx={{ 
            mt: 2, 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}>
            <Typography variant="body1" color="text.secondary">
              ¿Ya tienes una cuenta? Si es así, empieza ya
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/loginAdmin')}
              sx={{
                fontFamily: "Poppins",
                fontSize: "0.9rem",
                width: '60%'
              }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminRegisterPage;
