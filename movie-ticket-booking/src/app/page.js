// import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Header from './component/header.jsx'; 
import HeroSection from './component/banner';
// import MovieSlider from './component/MovieSlider';
import Promotions from './component/promotion';
import BlogSection from './component/blog';
import FAQSection from './component/FAQ';
import Footer from './component/footer';

export default function Home() {
  const movies = [
    { id: 1, title: 'Movie 1', poster: '/movie1.jpg' },
    { id: 2, title: 'Movie 2', poster: '/movie2.jpg' },
    // Add more movies
  ];

  const posts = [
    { id: 1, title: 'Blog Post 1', excerpt: 'This is a blog post', thumbnail: '/post1.jpg' },
    { id: 2, title: 'Blog Post 2', excerpt: 'This is another blog post', thumbnail: '/post2.jpg' },
    // Add more posts
  ];

  return (
    <div>
      {/* <Header /> */}
      {/* <HeroSection /> */}
      {/* <MovieSlider movies={movies} /> */}
      {/* <Promotions /> */}
      <BlogSection posts={posts} />
      {/* <FAQSection /> */}
      {/* <Footer /> */}
    </div>
  );
}






