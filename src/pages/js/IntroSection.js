import React from 'react';
import bg2 from '../../img/bg2.jpg';

function IntroSection() {
  return (
    <section className="relative min-h-screen flex items-center text-white snap-start">
      {/* Ảnh nền */}
      <img
        src={bg2}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70 -z-10"
      />

      {/* Lớp phủ đen */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 -z-10" />

      {/* Nội dung */}
      <div className="w-full max-w-7xl mx-auto px-10 py-16 flex flex-col md:flex-row items-center relative z-10">
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
