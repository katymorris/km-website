import { useEffect, useState } from 'react';
import type { BlogPost } from '../types';
import { loadAllPosts } from '../utils/postUtils';
import PostCard from './PostCard';

function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const loadedPosts = await loadAllPosts();
        setPosts(loadedPosts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="loading">Loading posts...</p>;
  }

  if (error) {
    return <p className="error">Error loading posts: {error}</p>;
  }

  if (posts.length === 0) {
    return <p className="error">No posts found.</p>;
  }

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default BlogPosts;

