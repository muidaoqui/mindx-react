import React from 'react';
import cl from '../../img/chienluoc.png';
import bg3 from '../img/bg3.jpg';


function StrategySection() {
  return (
    <section className="relative min-h-screen text-white flex items-center">
      {/* ẢNH NỀN */}
      <img
        src={bg3}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70 -z-10"
      />

      {/* LỚP PHỦ ĐEN (nếu muốn) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 -z-10" />

      {/* NỘI DUNG */}
      <div className="w-full max-w-7xl mx-auto px-10 py-16 flex flex-col md:flex-row items-center">
        <img
          src={cl}
          alt="Chiến lược kinh doanh MD Autohunt"
          className="md:w-1/4 w-2/3 rounded-xl shadow-lg mb-6 md:mb-0 md:mr-10"
        />
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">Chiến Lược</h1>
          <p className="text-lg mb-4">
            MD Autohunt không chỉ là một nền tảng kết nối khách hàng...
          </p>
          <p className="text-lg mb-4">
            Về công nghệ, chúng tôi liên tục nâng cấp hệ thống...
          </p>
          <p className="text-lg">
            Với tầm nhìn dài hạn, MD Autohunt sẽ tiếp tục mở rộng mạng lưới...
          </p>
        </div>
      </div>
    </section>
  );
}

export default StrategySection;
