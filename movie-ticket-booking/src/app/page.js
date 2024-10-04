import React from 'react';
import BlogSection from './component/blog';
import Event from './component/event';
import SapChieu from './component/sapchieu';
// import PhimDangChieu from './component/dangchieu';
import QA from './component/qa';
export default function Home() {
  return (
    <div>
    
      <SapChieu/>
      {/* <PhimDangChieu/> */}
      <Event/>
      <BlogSection />
      <QA/>
     
    </div>
  );
}






