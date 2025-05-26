import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.src = '/romantic-music.mp3'; // This is a placeholder - users need to add their own music file
      audioRef.current.loop = true;
    }

    // Play or pause based on isPlaying prop
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      
      // Handle autoplay restrictions
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Autoplay prevented:', error);
        });
      }
    } else {
      audioRef.current.pause();
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isPlaying]);

  return (
    <button 
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300"
      aria-label={isPlaying ? 'Mute music' : 'Play music'}
    >
      {isPlaying ? (
        <Volume2 className="w-6 h-6 text-pink-500" />
      ) : (
        <VolumeX className="w-6 h-6 text-pink-500" />
      )}
    </button>
  );
};