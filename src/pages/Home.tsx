import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import About from '../components/About';
import BlogPosts from '../components/BlogPosts';

function Home() {
  return (
    <div className="container">
      <Header />
      <Navbar />
      <main>
        <About />
        <section className="blog-posts">
          <h2>Blog Posts</h2>
          <BlogPosts />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;

