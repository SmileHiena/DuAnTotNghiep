// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import HeroSection from './component/banner';
// import MovieSlider from './component/MovieSlider';
import Promotions from './component/promotion';
import BlogSection from './component/blog';
import FAQSection from './component/FAQ';

export default function Home() {
  return (
    <div>
    
      <HeroSection />
      <Promotions />
      <BlogSection />
      <FAQSection />
    </div>
  );
}






