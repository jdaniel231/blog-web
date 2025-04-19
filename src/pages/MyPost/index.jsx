import { useEffect, useState } from "react";
import { deletePost, getMyBlogPosts } from "../../services/post";
import { Container, Typography, Box, CircularProgress, Card, CardContent, CardActions, Button, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MyPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

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

  const handleDeletePost = async () => {
    if (!confirmDelete) return;
    try {
      await deletePost(confirmDelete.id);
      setPosts(posts.filter((post) => post.id !== confirmDelete.id));
    } catch (err) {
      console.error("Erro ao excluir post:", err);
    } finally {
      setConfirmDelete(null);
    }
  };

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
              <Button size="small" onClick={() => navigate(`/posts/${post.id}`)}>
                Ver detalhes
              </Button>
              <Button size="small" onClick={() => navigate(`/edit-post/${post.id}`)}>
                Editar
              </Button>
              <Button size="small" onClick={() => setConfirmDelete(post)}>
                Excluir
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Dialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Excluir Postagem?
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            Você tem certeza que deseja excluir a postagem?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Cancelar</Button>
          <Button onClick={handleDeletePost} autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}