import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'; // Import component Navbar
import '../css/Home.css'; // File CSS
import poster from '../../img/poster.png';
import {cclass, eclass} from '../../img/mec/index' 
import { innova, veloz } from '../../img/toyota/index';
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
          <div className='hot'>
            <h2>Best Seller</h2>
            <div className='hot-list'>
              <div className='hot-item'>
                <img src={cclass} alt='CClass' className='hot-img' />
                <h3>C Class</h3>
              </div>
              <div className='hot-item'>
                <img src={eclass} alt='EClass' className='hot-img' />
                <h3>E Class</h3>
              </div>
              <div className='hot-item'>
                <img src={veloz} alt='Veloz' className='hot-img' />
                <h3>Veloz</h3>
              </div>
              <div className='hot-item'>
                <img src={innova} alt='Innova' className='hot-img' />
                <h3>Innova</h3>
              </div>
            </div>
          </div>
        </div>
        
      </main>
    </div>
  );
}

export default Home;