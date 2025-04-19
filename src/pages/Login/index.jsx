import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button, Alert, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import ErrorOutline from '@mui/icons-material/ErrorOutline';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [erroDialog, setErroDialog] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validação de campos
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    if (!email.includes('@')) {
      setError('Insira um email válido');
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setError(result.message || 'Erro ao fazer login. Tente novamente.');
        setErroDialog(true);
        setTimeout(() => {
          setErroDialog(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link to="/register">
              Não tem uma conta? Registre-se
            </Link>
          </Box>
        </Box>
      </Box>
      <Dialog open={success}>
        <DialogTitle>Sucesso!
          <CheckCircleOutline sx={{ color: 'green' }} />
        </DialogTitle>
        <DialogContent>
          <Typography>Você foi logado com sucesso!</Typography>
        </DialogContent>
      </Dialog>
      <Dialog open={erroDialog}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
        <ErrorOutline sx={{ fontSize: 50, color: 'red', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Erro
        </Typography>
        <Typography>Senha ou email incorretos!</Typography>
      </DialogContent>
      </Dialog>
    </Container>
  );
}