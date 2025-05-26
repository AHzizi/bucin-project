import React, { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { PhotoSlider } from './components/PhotoSlider';
import { SurpriseButton } from './components/SurpriseButton';
import { LoveLetter } from './components/LoveLetter';
import { MusicPlayer } from './components/MusicPlayer';
import { FallingPetals } from './components/FallingPetals';
import { images } from './data/images';
import './index.css';

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

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

  // Add click event listener to enable fullscreen and music
  const handleFirstInteraction = () => {
    enterFullscreen();
    if (!musicPlaying) {
      setMusicPlaying(true);
    }
    document.removeEventListener('click', handleFirstInteraction);
  };

  useEffect(() => {
    document.addEventListener('click', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    // Update title
    document.title = "Happy Anniversary Ainul Ma'rifah ❤️";
    
    // Update favicon
    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.setAttribute('href', 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23ff6b81" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>');
    }
  }, []);

  return (
    <div className="anniversary-page">
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