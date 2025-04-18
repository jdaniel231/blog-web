import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../../services/post";

export default function EditPost() {

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar a postagem');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await updatePost(id, { title: post.title, description: post.description });
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError('Erro ao atualizar a postagem');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6" sx={{ mt: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <Typography variant="h6" sx={{ mt: 4 }}>
          Postagem não encontrada
        </Typography>
      </Container>
    );
  }   


  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Editar Post
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Título"
          fullWidth
          margin="normal"
          required
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />

        <TextField
          label="Conteúdo"
          fullWidth
          margin="normal"
          required
          multiline
          rows={10}
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? 'Publicando...' : 'Publicar'}
        </Button>
        
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 2, ml: 1 }}
          onClick={() => navigate('/my-post')}
        >
          Cancelar
        </Button>
      </Box>
    </Container>
  );
}