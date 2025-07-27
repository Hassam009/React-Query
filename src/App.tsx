import CreatePostForm from "./components/CreatePostForm";
import PostList from "./components/PostList";
import SignupForm from "./components/SignupForm";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          
          <Route path="/" element={<Navigate to="/signup" replace />} />

        
          <Route path="/signup" element={<SignupForm />} />

         
          <Route path="/posts" element={<PostList />} />
          <Route path="/create" element={<CreatePostForm />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
