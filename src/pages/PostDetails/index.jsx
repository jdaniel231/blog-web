import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Divider } from '@mui/material';
import { getPost } from '../../services/post';

export default function PostDetails() {
  const { id } = useParams(); // Obtém o ID da postagem da URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id); // Chama a função getPost com o ID da postagem
        setPost(data); // Atualiza o estado com os dados da postagem
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar a postagem');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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
      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Publicado em {new Date(post.created_at).toLocaleString()} por:  {post.user ? `${post.user.email}` : 'Usuário desconhecido'}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" paragraph>
        {post.description}
      </Typography>
    </Container>
  );
}