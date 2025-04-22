import { Box, Card, CardContent, Typography } from "@mui/material";

export default function CommentCard({ comment }) {
  return (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {comment.commit}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {comment.user.name} 
            {new Date(comment.created_at).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}