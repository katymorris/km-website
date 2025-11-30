import type { BlogPost, PostsIndex } from '../types';

export async function loadPostsIndex(): Promise<PostsIndex> {
  const response = await fetch(`${import.meta.env.BASE_URL}posts/posts.json`);
  if (!response.ok) {
    throw new Error('Failed to load posts index');
  }
  return response.json();
}

export async function loadPost(postFile: string): Promise<BlogPost> {
  const response = await fetch(`${import.meta.env.BASE_URL}posts/${postFile}`);
  if (!response.ok) {
    throw new Error(`Failed to load post: ${postFile}`);
  }
  return response.json();
}

export async function loadAllPosts(): Promise<BlogPost[]> {
  const index = await loadPostsIndex();
  const postPromises = index.posts.map(postFile => loadPost(postFile));
  const posts = await Promise.all(postPromises);
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

