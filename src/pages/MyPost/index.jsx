import { useEffect, useState } from "react";
import { getMyBlogPosts } from "../../services/post";
import { Container, Typography, Box, CircularProgress, Card, CardContent, CardActions, Button } from "@mui/material";

export default function MyPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const data = await getMyBlogPosts(); // Chama a API para obter os posts do usuário
        setPosts(data); // Atualiza o estado com os posts retornados
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar seus posts:", err);
        setError("Erro ao carregar seus posts");
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
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

  if (!posts.length) {
    return (
      <Container>
        <Typography variant="h6" sx={{ mt: 4 }}>
          Você ainda não criou nenhum post.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Minhas Postagens
      </Typography>
      <Box>
        {posts.map((post) => (
          <Card key={post.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href={`/posts/${post.id}`}>
                Ver detalhes
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
}