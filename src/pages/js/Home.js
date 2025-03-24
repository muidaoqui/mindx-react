import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'; 
import poster from '../../img/poster.png';
import {cclass, eclass} from '../../img/mec/index' 
import { innova, veloz } from '../../img/toyota/index';
function Home() {

  
  return (
    <div className="home">
      
      <main className="home-main">
        <div className='content'>
          <div className='poster'>
            <img src={poster} alt='Poster' className='h-auto  w-auto object-cover' />
          </div>
          <div className='hot'>
            
            
          </div>
          <div className='check'>
            <div className='flex justify-around h-20  '>
              <div className='check-item'>
                <h3 className='h3'>Kiểu dáng</h3>
                <select className='h-8 border-2 border-gray-300 rounded-lg'>
                  <option value=''>Chọn kiểu dáng</option>
                  <option value=''>Sedan</option>
                  <option value=''>SUV</option>
                  <option value=''>MPV</option>
                </select>
              </div>
              <div className='check-item'>
                <h3 className='h3'>Giá</h3>
                <select className='h-8 border-2 border-gray-300 rounded-lg'>
                  <option value=''>Chọn giá</option>
                  <option value=''>Dưới 500 triệu</option>
                  <option value=''>Từ 500 triệu đến 1 tỷ</option>
                  <option value=''>Trên 1 tỷ</option>
                  <option value=''>Trên 2 tỷ</option>
                </select>
              </div>
              <div className='check-item'>
                <h3 className='h3'>Số chỗ ngồi</h3>
                <select className='h-8 border-2 border-gray-300 rounded-lg'>
                  <option value=''>Chọn số chỗ ngồi</option>
                  <option value=''>4 chỗ</option>
                  <option value=''>5 chỗ</option>
                  <option value=''>7 chỗ</option>
                </select>
              </div>
              <div className='check-item'>
                <h3 className='h3'>Dòng xe</h3>
                <select className='h-8 border-2 border-gray-300 rounded-lg'>
                  <option value=''>Chọn dòng xe</option>
                  <option value=''>Toyota</option>
                  <option value=''>Mercedes</option>
                  <option value=''>BMW</option>
                  <option value=''>Audi</option>
                </select>
              </div>
              <div className='check-item'>
                <h3 className='h3'>Phiên bản</h3>
                <select className='h-8 border-2 border-gray-300 rounded-lg'>
                  <option value=''>Chọn phiên bản</option>
                  <option value=''>Standard</option>
                  <option value=''>Premium</option>
                  <option value=''>Luxury</option>
                  <option value=''>Sport</option>
                </select>
              </div>
              <div className='check-item'>
                <h3 className='h3'>Xuất xứ</h3>
                <select className='h-8 border-2 border-gray-300 rounded-lg'>
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