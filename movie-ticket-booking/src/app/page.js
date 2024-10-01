import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import HeroSection from './component/banner';
// import MovieSlider from './component/MovieSlider';
// import Promotions from './component/promotion';
// import BlogSection from './component/blog';
// import FAQSection from './component/FAQ';
import Event from './component/event';
import PhimDangChieu from './component/sapchieu';
export default function Home() {
  return (
    <div>
    <Event/>
<PhimDangChieu/>
      {/* <HeroSection />
      <Promotions />
      <BlogSection />
      <FAQSection /> */}
    </div>
  );
}






