import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'; // Import component Navbar
import '../css/Home.css'; // File CSS

function Home() {
  // State để quản lý dữ liệu động (ví dụ: danh sách bài viết)
   // Mảng rỗng nghĩa là chỉ chạy một lần khi component mount
  
  return (
    <div className="home">
      <header className="home-header">
        <h1>Chào mừng đến với Trang Chủ</h1>
        <p>Khám phá nội dung tuyệt vời bên dưới!</p>
      </header>
      
    </div>
  );
}

export default Home;