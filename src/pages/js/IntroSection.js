import React from 'react';
import bg2 from '../../img/bg2.jpg';

function IntroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center">
        <img src={bg2} alt="Ảnh giới thiệu MD Autohunt" className="md:w-1/3 w-2/3 rounded-xl shadow-lg mb-6 md:mb-0 md:ml-10" />
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-6">Giới Thiệu</h1>
          <p className="text-lg mb-4">
            MD Autohunt là nền tảng chuyên cung cấp các dịch vụ và giải pháp săn tìm ô tô chất lượng...
          </p>
          <p className="text-lg">
            Chúng tôi cam kết mang đến cho khách hàng sự an tâm với các dịch vụ kiểm định xe chuyên sâu...
          </p>
        </div>
      </div>
    </section>
  );
}

export default IntroSection;
