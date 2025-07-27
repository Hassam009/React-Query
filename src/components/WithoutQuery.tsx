import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import { CircularProgress, Alert } from '@mui/material';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function WithoutQuery() {
  const [data, setData] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(res.data);
        setIsLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occurred'));
        }
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <CircularProgress />
      </div>
    );

  if (error)
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
