import React from 'react';
import cl from '../../img/chienluoc.png';
import bg3 from '../../img/bg3.png';


function StrategySection() {
  return (
    <section className="relative min-h-screen text-white flex items-center text-right snap-start">
      <img
        src={bg3}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70 -z-10"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 -z-10" />

      <div className="w-full max-w-7xl mx-auto px-10 py-16 flex flex-col md:flex-row items-center absolute right-0 -translate-x-1/6 z-10">
        <div className="md:w-3/4">
          <h1 className="text-4xl text-cyan-400 font-bold mb-6">Strategy</h1>
          <p className="text-xl mb-4">
            At MD Autohunt, our strategy is built on three core pillars: Technology, Service Excellence, and Trust. We leverage modern technologies like AI and big data to enhance the car-searching experience, making it smarter and more personalized.
          </p>
          <p className="text-xl mb-4">
            Our service philosophy revolves around transparency, dedicated customer support, and streamlined processes to ensure satisfaction from start to finish.
          </p>
          <p className="text-xl">
            By continuously evolving and partnering with top industry players, MD Autohunt aims to become a leading name in the automotive market, offering safe, efficient, and reliable solutions for every car enthusiast.
          </p>
        </div>
      </div>
    </section>
  );
}

export default StrategySection;
