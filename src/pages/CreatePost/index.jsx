import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';
import { createPost } from '../../services/post';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await createPost({ title, description });
      
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError('Erro ao criar postagem');
      setLoading(false);
    }
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Nova Postagem
      </Typography>
      
      {error && <Alert severity="error">{error}</Alert>}
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Título"
          fullWidth
          margin="normal"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <TextField
          label="Conteúdo"
          fullWidth
          margin="normal"
          required
          multiline
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? 'Publicando...' : 'Publicar'}
        </Button>
      </Box>
    </Container>
  );
}