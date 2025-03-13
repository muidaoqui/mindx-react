import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'; // Import component Navbar
import '../css/Home.css'; // File CSS
import poster from '../../img/poster.png'; // Import ảnh poster
function Home() {
  // State để quản lý dữ liệu động (ví dụ: danh sách bài viết)
   // Mảng rỗng nghĩa là chỉ chạy một lần khi component mount
  
  return (
    <div className="home">
      
      <main className="home-main">
        <div className='content'>
          <div className='poster'>
            <img src={poster} alt='Poster' className='poster' />
          </div>
        </div>
        
      </main>
    </div>
  );
}

export default Home;