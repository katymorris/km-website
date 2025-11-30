import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { loadPost } from '../utils/postUtils';
import { formatDate } from '../utils/dateUtils';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!id) {
        setError('No post ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const loadedPost = await loadPost(`${id}.json`);
        setPost(loadedPost);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  const formatContent = (content: string): JSX.Element[] => {
    const paragraphs = content.split('\n\n');
    const result: JSX.Element[] = [];
    let currentList: string[] = [];
    let listIndex = 0;

    const flushList = () => {
      if (currentList.length > 0) {
        result.push(
          <ul key={`list-${listIndex++}`}>
            {currentList.map((item, itemIndex) => {
              const parts = item.split(/(\*\*[^*]+\*\*)/g);
              return (
                <li key={itemIndex}>
                  {parts.map((part, partIndex) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      const boldText = part.slice(2, -2);
                      return <strong key={partIndex}>{boldText}</strong>;
                    }
                    return part;
                  })}
                </li>
              );
            })}
          </ul>
        );
        currentList = [];
      }
    };

    paragraphs.forEach((paragraph, index) => {
      // Check if paragraph is a heading (starts with ##)
      if (paragraph.startsWith('## ')) {
        flushList();
        const headingText = paragraph.substring(3);
        result.push(<h3 key={index}>{headingText}</h3>);
        return;
      }
      
      // Check if paragraph is a list item (starts with -)
      if (paragraph.startsWith('- ')) {
        const listItem = paragraph.substring(2);
        currentList.push(listItem);
        return;
      }
      
      // Regular paragraph
      flushList();
      const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
      result.push(
        <p key={index}>
          {parts.map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              const boldText = part.slice(2, -2);
              return <strong key={partIndex}>{boldText}</strong>;
            }
            return part;
          })}
        </p>
      );
    });

    flushList();
    return result;
  };

  return (
    <div className="container">
      <Header />
      <Navbar />
      <main>
        <div className="back-link">
          <Link to="/">← Back to all posts</Link>
        </div>
        {loading && <p className="loading">Loading post...</p>}
        {error && <p className="error">Error loading post: {error}</p>}
        {post && (
          <article className="post-article">
            <h2>{post.title}</h2>
            <div className="post-date">{formatDate(post.date)}</div>
            <div className="post-body">{formatContent(post.content)}</div>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default PostDetail;

