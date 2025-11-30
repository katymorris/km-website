export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface PostsIndex {
  posts: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  technologies?: string[];
}

export interface ProjectsData {
  projects: Project[];
}

