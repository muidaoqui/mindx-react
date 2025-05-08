import React from 'react';
import poster from '../../img/poster.jpg';

function PosterSection() {
  return (
    <section className="h-screen relative bg-black snap-start">
      <img
        src={poster}
        alt="Poster quảng cáo xe"
        className="w-full h-full object-cover opacity-70"
      />
      <div className="absolute top-1/3 right-0 transform -translate-x-1/4 text-white text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-cyan-400">
          Find your dream car
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </section>
  );
}

export default PosterSection;
