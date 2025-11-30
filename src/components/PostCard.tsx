import { useNavigate } from 'react-router-dom';
import type { BlogPost } from '../types';
import { formatDate } from '../utils/dateUtils';

interface PostCardProps {
  post: BlogPost;
}

function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="post-card" onClick={handleClick}>
      <h3>{post.title}</h3>
      <div className="post-date">{formatDate(post.date)}</div>
      <div className="post-excerpt">{post.excerpt}</div>
    </div>
  );
}

export default PostCard;

