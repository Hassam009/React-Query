
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PostCard from './PostCard';
import { CircularProgress, Alert } from '@mui/material';
import type { Post } from '../types/PostType';

const fetchPosts = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.data;
};

export default function PostList() {
  const { data, isLoading, isError, error } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <CircularProgress />
      </div>
    );

  if (isError)
    return (
      <div className="max-w-xl mx-auto mt-4">
        <Alert severity="error">{error.message}</Alert>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Latest Posts</h2>
      {data?.slice(0, 5).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
