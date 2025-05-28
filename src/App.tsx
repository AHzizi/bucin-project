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
    </div>
  );
}

export default App;
