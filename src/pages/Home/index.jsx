import { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Box } from '@mui/material';
// import api from '../../services/api';
import { getPosts } from '../../services/post';
import PostCard from '../../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar postagens');
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
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
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }} >
      <Typography variant="h4" component="h1" gutterBottom>
        Postagens Recentes
      </Typography>
      
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Container>
  );
}