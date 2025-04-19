import React from 'react';
import poster from '../../img/poster.jpg';

function PosterSection() {
  return (
    <section className="h-screen relative bg-black snap-start">
      <img src={poster} alt="Poster quảng cáo xe" className="w-full h-full object-cover opacity-70" />
      <div className="absolute top-1/3 right-0 transform -translate-x-1/4 text-white text-center">
        <h2 className="text-4xl font-bold mb-2 text-cyan-400">Find your dream car</h2>
        <p className='text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </section>
  );
}

export default PosterSection;
