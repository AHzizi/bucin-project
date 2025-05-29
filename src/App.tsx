import React, { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { PhotoSlider } from './components/PhotoSlider';
import { SurpriseButton } from './components/SurpriseButton';
import { LoveLetter } from './components/LoveLetter';
import { MusicPlayer } from './components/MusicPlayer';
import { FallingPetals } from './components/FallingPetals';
import { images } from './data/images';
import confetti from './utils/confetti'; // Import confetti
import heartRain from './utils/heartRain'; // Import confetti
import './index.css';


function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showHeartButton, setShowHeartButton] = useState(true);


  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const enterFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error('Error attempting to enable fullscreen:', error);
    }
  };

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  const handleHeartClick = async () => {
    console.log('Heart clicked');

    try {
      confetti();
    } catch (e) {
      console.error('Confetti error:', e);
    }
    try {
      heartRain();
    } catch (e) {
      console.error('heartRain error:', e);
    }

    try {
      await enterFullscreen();
    } catch (e) {
      console.error('Fullscreen error:', e);
    }

    setMusicPlaying(true);
    setShowHeartButton(false);
  };


  useEffect(() => {
    document.title = "Happy Anniversary Ainul Ma'rifah ❤️";

    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.setAttribute(
        'href',
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23ff6b81" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
      );
    }
  }, []);

  return (
    <div className="anniversary-page relative min-h-screen overflow-hidden">
      {showHeartButton && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-bl from-pink-400 via-pink-200 to-pink-300 z-50"
        >
          <button
            onClick={handleHeartClick}
            aria-label="Love Button"
            className="text-6xl animate-pulse text-pink-600 rounded-full w-24 h-24 flex items-center justify-center"
            style={{ userSelect: 'none' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 456.075"><path fill="#F77AA0" d="M253.648 83.482c130.39-219.052 509.899 65.491-.513 372.591-514.778-328.934-101.872-598.684.513-372.591z"/><path fill="#EC557A" d="M121.414.647c48.667-4.845 100.027 17.922 129.334 76.927a197.378 197.378 0 013.538 11.586c10.541 34.289.093 49.641-12.872 50.551-18.137 1.274-20.215-14.849-24.967-27.641-23.756-63.973-57.673-99.447-100.014-110.208 1.655-.432 3.313-.838 4.981-1.215zm223.073 9.932C490.816-28.5 661.321 195.704 279.469 439.707 561.641 215.546 470.391 36.151 344.487 10.579z"/><path fill="#FA9EBB" d="M130.561 35.502C87.904 31.256 42.91 59.4 31.389 101.568c-7.867 25.592-.07 37.051 9.607 37.73 13.536.948 15.088-11.084 18.634-20.632 17.732-47.748 43.045-74.225 74.65-82.255a107.734 107.734 0 00-3.719-.909z"/></svg>
          </button>
        </div>
      )}

      <FallingPetals />
      <MusicPlayer isPlaying={musicPlaying} onToggle={toggleMusic} />
      <HeroSection />
      <PhotoSlider images={images} />
      <SurpriseButton />
      <LoveLetter />
      <footer className="absolute bottom-5 left-10 z-50 opacity-90">
      <a 
        href="https://github.com/AHzizi" 
        className="flex items-center gap-2 text-pink-500 text-2xl font-bold handwritten hover:opacity-100 animate-bounce"
        target="_blank" 
        rel="noopener noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0,0,256,256">
          <g fill="#e60076"><g transform="scale(4,4)">
            <path d="M32,6c-14.359,0 -26,11.641 -26,26c0,12.277 8.512,22.56 19.955,25.286c-0.592,-0.141 -1.179,-0.299 -1.755,-0.479v-5.957c0,0 -0.975,0.325 -2.275,0.325c-3.637,0 -5.148,-3.245 -5.525,-4.875c-0.229,-0.993 -0.827,-1.934 -1.469,-2.509c-0.767,-0.684 -1.126,-0.686 -1.131,-0.92c-0.01,-0.491 0.658,-0.471 0.975,-0.471c1.625,0 2.857,1.729 3.429,2.623c1.417,2.207 2.938,2.577 3.721,2.577c0.975,0 1.817,-0.146 2.397,-0.426c0.268,-1.888 1.108,-3.57 2.478,-4.774c-6.097,-1.219 -10.4,-4.716 -10.4,-10.4c0,-2.928 1.175,-5.619 3.133,-7.792c-0.2,-0.567 -0.533,-1.714 -0.533,-3.583c0,-1.235 0.086,-2.751 0.65,-4.225c0,0 3.708,0.026 7.205,3.338c1.614,-0.47 3.341,-0.738 5.145,-0.738c1.804,0 3.531,0.268 5.145,0.738c3.497,-3.312 7.205,-3.338 7.205,-3.338c0.567,1.474 0.65,2.99 0.65,4.225c0,2.015 -0.268,3.19 -0.432,3.697c1.898,2.153 3.032,4.802 3.032,7.678c0,5.684 -4.303,9.181 -10.4,10.4c1.628,1.43 2.6,3.513 2.6,5.85v8.557c-0.576,0.181 -1.162,0.338 -1.755,0.479c11.443,-2.726 19.955,-13.009 19.955,-25.286c0,-14.359 -11.641,-26 -26,-26z"></path>
          </g></g>
        </svg>
        AHzizi
      </a>
    </footer>



    </div>
  );
}

export default App;
