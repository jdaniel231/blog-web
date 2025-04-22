import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  TextareaAutosize,
  Button,
  Divider,
} from "@mui/material";
import { getPost } from "../../services/post";
import { createComment, getComments } from "../../services/comment";
import { useParams } from "react-router-dom";
import CommentCard from "../../components/CommentCard";

export default function CreateComment() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [sendingComment, setSendingComment] = useState(false);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setPost(data);
      } catch (err) {
        setError('Erro ao carregar a postagem');
      } finally {
        setLoadingPost(false);
      }
    };
    fetchPost();
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await getComments(id);
      setComments(response);
    } catch (err) {
      setError('Erro ao carregar comentários');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setError('');
    setSendingComment(true);
    try {
      await createComment(id, commentText);
      setCommentText('');
      await fetchComments(); // atualiza lista após novo comentário
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
      setError('Erro ao enviar comentário. Tente novamente.');
    } finally {
      setSendingComment(false);
    }
  };

  if (loadingPost) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !post) {
    return (
      <Container>
        <Typography color="error" variant="h6" sx={{ mt: 4 }}>
          {error}
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
        Publicado em {new Date(post.created_at).toLocaleString()} por:{" "}
        {post.user ? post.user.name : "Usuário desconhecido"}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" paragraph>
        {post.description}
      </Typography>

      <Divider sx={{ my: 3 }} />

      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}

      <Divider sx={{ my: 3 }} />

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <TextareaAutosize
          minRows={4}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Digite seu comentário"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            fontFamily: "inherit",
            resize: "vertical",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#1976d2";
            e.target.style.boxShadow = "0 0 0 2px rgba(25, 118, 210, 0.2)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ccc";
            e.target.style.boxShadow = "none";
          }}
        />

        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={sendingComment}>
            {sendingComment ? <CircularProgress size={24} color="inherit" /> : "Enviar"}
          </Button>

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
