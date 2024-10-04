import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import HeroSection from './component/banner';
// import MovieSlider from './component/MovieSlider';
// import Promotions from './component/promotion';
import Banner from './component/banner';
import BlogSection from './component/blog.jsx';
import Sapchieu from './component/sapchieu.jsx';
// import FAQSection from './component/FAQ';
import Event from './component/event';
import PhimDangChieu from './component/dangchieu';
export default function Home() {
  return (
    <div>
      
      {/* <PhimDangChieu/> */}
      {/* <HeroSection /> */}
      {/* <Promotions /> */}
      <Banner/>
      <Sapchieu />
      <Event/>
      <BlogSection />

      {/* <FAQSection /> */}
    </div>
  );
}