import { Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
// import {getPost} from '../../services/post';

export default function PostCard({ post }) {

  const navigate = useNavigate();

  return (
    <Box>
      <Card sx={{ mb: 2 }}>
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
          <Button size="small" onClick={() => navigate(`/posts/${post.id}/comments`)}>
            Comentarios
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}