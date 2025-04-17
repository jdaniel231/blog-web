import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Typography, Box, Container, Alert } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    setError('');

    // Validação de senha
    if (password !== passwordConfirmation) {
      setError('As senhas não conferem');
      return;
    }

    // Validação de email
    if (!email.includes('@')) {
      setError('Por favor, insira um email válido');
      return;
    }

    setLoading(true);
    const result = await registerUser(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message || 'Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado de email
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado de password
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordConfirmation"
            label="Confirme a senha"
            type="password"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)} // Atualiza o estado de passwordConfirmation
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading} // Desabilita o botão enquanto carrega
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link to="/login">
              Já tem uma conta? Faça login
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}