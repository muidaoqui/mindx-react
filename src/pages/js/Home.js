import React from 'react';
import PosterSection from './PosterSection';
import IntroSection from './IntroSection';
import StrategySection from './StrategySection';
import SupportBox from './SupportBox';

function Home() {
  return (
    <div className="home">
      <main className="home-main">
        <PosterSection />
        <IntroSection />
        <StrategySection />
        <SupportBox />
      </main>
    </div>
  );
}

export default Home;
