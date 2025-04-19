import React from 'react';
import bg2 from '../../img/bg2.png';

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
      <div className=" w-full max-w-7xl mx-auto px-10 py-16 flex flex-col md:flex-row items-center absolute right-0 -translate-x-1/5 z-10">
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-6 text-cyan-400">Introduce</h1>
          <p className="text-xl mb-4">
            MD Autohunt is a trusted platform dedicated to helping users find the perfect car with ease and confidence.
          </p>
          <p className="text-xl">
            With a mission to simplify and elevate the car-buying experience, MD Autohunt combines technology, reliability, and customer care to deliver outstanding value.
          </p>
        </div>
      </div>
    </section>
  );
}

export default IntroSection;
