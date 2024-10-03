import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import BlogSection from './component/blog';
import Event from './component/event';
import SapChieu from './component/sapchieu';
import PhimDangChieu from './component/dangchieu';
export default function Home() {
  return (
    <div>
      <Event/>
      <SapChieu/>
      <PhimDangChieu/>
      <BlogSection />
     
    </div>
  );
}






