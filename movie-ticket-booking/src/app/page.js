import React from 'react';
import BlogSection from './component/blog';
import Event from './component/event';
import SapChieu from './component/sapchieu';
import PhimDangChieu from './component/dangchieu';
import QA from './component/qa';
import Banner from './component/banner';
export default function Home() {
  return (
    <div>
      <Banner/>
      <SapChieu/>
      <PhimDangChieu/>
      <Event/>
      <BlogSection />
      <QA/>
     
    </div>
  );
}






