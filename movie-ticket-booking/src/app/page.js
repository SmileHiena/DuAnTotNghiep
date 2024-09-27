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
  return (
    <div>
      <Header />
      <HeroSection />
      <Promotions />
      <BlogSection />
      <FAQSection />
      <Footer />
    </div>
  );
}






