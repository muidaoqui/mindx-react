import React from 'react';
import ava from '../../img/ava.jpg';

function SupportBox() {
  return (
    <div className="fixed right-4 bottom-40 bg-pink-100 p-4 rounded-lg shadow-md w-60 z-10">
      <div className="absolute -left-1 bg-pink-100 p-1 rounded-lg shadow-md">
        <img src={ava} alt="Hỗ trợ viên Mui Dao" className="w-16 h-16 rounded-full border border-gray-800 shadow-lg" />
      </div>
      <div className="pl-20 pt-2">
        <a href="https://www.facebook.com/mui.ao.714373">
          <h3 className="text-black font-semibold">Mui Dao</h3>
          <p className="text-gray-700 text-center text-sm">Service</p>
        </a>
      </div>
      
    </div>
  );
}

export default SupportBox;
