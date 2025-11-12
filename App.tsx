import React from 'react';
import Presentation from './components/Presentation';
import { slidesData } from './data/slidesData';

const App: React.FC = () => {
  return (
    <main className="bg-[#F9F8F6] text-[#1B3C53] w-screen min-h-screen flex flex-col">
      <Presentation slides={slidesData} />
    </main>
  );
};

export default App;