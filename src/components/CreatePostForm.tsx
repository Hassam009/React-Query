import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { TextField, Button, Alert, CircularProgress } from '@mui/material';

type NewPost = {
  title: string;
  body: string;
  userId: number;
};

const createPost = async (newPost: NewPost) => {
  const res = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  return res.data;
};

export default function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log('Post created:', data);
       queryClient.setQueryData(['posts'], (old) => (Array.isArray(old) ? [...old, data] : [data]));
      setTitle('');
      setBody('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, body, userId: 1 });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 py-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label="Body"
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="flex justify-end">
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? <CircularProgress size={24} color="inherit" /> : 'Create Post'}
          </Button>
        </div>
      </form>

      {isSuccess && <Alert severity="success" className="mt-4">Post created successfully!</Alert>}
      {isError && <Alert severity="error" className="mt-4">{(error as Error).message}</Alert>}
    </div>
  );
}
