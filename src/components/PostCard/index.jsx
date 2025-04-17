import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
// import {getPost} from '../../services/post';

export default function PostCard({ post }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography>
          {post.description.substring(0, 100)}
          {post.description.length > 100 ? '...' : ''}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`posts/${post.id}`}>
          Ler mais
        </Button>
      </CardActions>
    </Card>
  );
}