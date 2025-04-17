import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography>
          {post.content.substring(0, 100)}
          {post.content.length > 100 ? '...' : ''}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/posts/${post.id}`}>
          Ler mais
        </Button>
      </CardActions>
    </Card>
  );
}