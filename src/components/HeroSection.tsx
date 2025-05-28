import React, { useEffect, useState } from 'react';

export const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay animation start for a better effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section hero-section min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-pink-100 to-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10"></div>
      </div>

      <div className="z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-pink-500 handwritten ${isVisible ? 'fade-in' : 'opacity-0'}`}>
          Happy First Anniversary
        </h1>
        
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-pink-600 handwritten ${isVisible ? 'fade-in delay-400' : 'opacity-0'}`}>
          Ainul Ma'rifah ❤️
        </h2>
        
        <p className={`text-xl md:text-2xl text-gray-700 italic mb-8 max-w-xl mx-auto ${isVisible ? 'slide-in-up delay-800' : 'opacity-0'}`}>
          "A year of love, laughter, and beautiful memories together"
        </p>
        
        <div className={`mt-8 flex justify-center ${isVisible ? 'fade-in delay-1000' : 'opacity-0'}`}>
          <svg className="w-16 h-16 text-pink-400 animate-bounce" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#FFF0F5" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,128C960,107,1056,117,1152,122.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className={`absolute top-10 right-10 float ${isVisible ? 'fade-in delay-1000' : 'opacity-0'}`}>
        <div className="text-pink-300 text-5xl">❀</div>
      </div>
      
      <div className={`absolute bottom-20 left-10 float delay-400 ${isVisible ? 'fade-in delay-800' : 'opacity-0'}`}>
        <div className="text-pink-400 text-4xl">❀</div>
      </div>
      <div className={`absolute top-20 left-10 float delay-400 ${isVisible ? 'fade-in delay-800' : 'opacity-0'}`}>
        <div className="text-pink-400 text-4xl">❀</div>
      </div>
      
      <div className={`absolute top-1/4 left-1/6 float delay-600 ${isVisible ? 'fade-in delay-600' : 'opacity-0'}`}>
        <div className="text-pink-200 text-3xl">❀</div>
      </div>
      <div className={`absolute bottom-1/4 left-1/6 float delay-600 ${isVisible ? 'fade-in delay-600' : 'opacity-0'}`}>
        <div className="text-pink-200 text-3xl">❀</div>
      </div>
    </section>
  );
};