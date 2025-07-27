
import { Card, CardContent, Typography } from '@mui/material';

import type { Post } from '../types/PostType';
interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="mb-4 shadow-md border border-gray-200">
      <CardContent>
        <Typography variant="h6" component="div" className="mb-2 text-gray-800">
          {post.id}
        </Typography>
        <Typography variant="h6" component="div" className="mb-2 text-gray-800">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
    </Card>
  );
}
