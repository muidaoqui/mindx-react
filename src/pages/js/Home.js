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
                <h3 className='h3'>C Class</h3>
              </div>
              <div className='hot-item'>
                <img src={eclass} alt='EClass' className='hot-img' />
                <h3 className='h3'>E Class</h3>
              </div>
              <div className='hot-item'>
                <img src={veloz} alt='Veloz' className='hot-img' />
                <h3 className='h3'>Veloz</h3>
              </div>
              <div className='hot-item'>
                <img src={innova} alt='Innova' className='hot-img' />
                <h3 className='h3'>Innova</h3>
              </div>
            </div>
          </div>
          <div className='check'>
            <div className='check-list'>
              <div className='check-item'>
                <h3 className='h3'>Kiểu dáng</h3>
                <select className='check-select'>
                  <option value=''>Chọn kiểu dáng</option>
                  <option value=''>Sedan</option>
                  <option value=''>SUV</option>
                  <option value=''>MPV</option>
                </select>
              </div>
              <div className='check-item'>
                <h3 className='h3'>Giá</h3>
                <select className='check-select'>
                  <option value=''>Chọn giá</option>
                  <option value=''>Dưới 500 triệu</option>
                  <option value=''>Từ 500 triệu đến 1 tỷ</option>
                  <option value=''>Trên 1 tỷ</option>
                  <option value=''>Trên 2 tỷ</option>
                </select>
              </div>
              <div className='check-item'>
                <h3 className='h3'>Số chỗ ngồi</h3>
                <select className='check-select'>
                  <option value=''>Chọn số chỗ ngồi</option>
                  <option value=''>4 chỗ</option>
                  <option value=''>5 chỗ</option>
                  <option value=''>7 chỗ</option>
                </select>
              </div>
              <div className='check-item'>
                <h3 className='h3'>Dòng xe</h3>
                <select className='check-select'>
                  <option value=''>Chọn dòng xe</option>
                  <option value=''>Toyota</option>
                  <option value=''>Mercedes</option>
                  <option value=''>BMW</option>
                  <option value=''>Audi</option>
                </select>
              </div>
              <div className='check-item'>
                <h3 className='h3'>Phiên bản</h3>
                <select className='check-select'>
                  <option value=''>Chọn phiên bản</option>
                  <option value=''>Standard</option>
                  <option value=''>Premium</option>
                  <option value=''>Luxury</option>
                  <option value=''>Sport</option>
                </select>
              </div>
              <div className='check-item'>
                <h3 className='h3'>Xuất xứ</h3>
                <select className='check-select'>
                  <option value=''>Chọn xuất xứ</option>
                  <option value=''>Nhập khẩu</option>
                  <option value=''>Lắp ráp trong nước</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="home-footer">
        <p>© 2025 Mui Dao</p>
        <p>Address: 39 Hai Thuong Lan Ong, 10 Ward, 5 District, Ho Chi Minh City</p>
        <p>Phone: 0773.153.xxx</p>
      </footer>
    </div>
  );
}

export default Home;