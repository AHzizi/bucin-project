import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageData } from '../types';

interface PhotoSliderProps {
  images: ImageData[];
}

export const PhotoSlider: React.FC<PhotoSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  const startAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [images.length]);

  const goToNext = () => {
    stopAutoPlay();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    startAutoPlay();
  };

  const goToPrev = () => {
    stopAutoPlay();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    startAutoPlay();
  };

  const goToSlide = (index: number) => {
    stopAutoPlay();
    setCurrentIndex(index);
    startAutoPlay();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      goToNext();
    } else if (touchEndX.current - touchStartX.current > 75) {
      goToPrev();
    }
  };

  return (
    <section 
      ref={sliderRef}
      className="section photo-slider relative overflow-hidden bg-white py-16"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div className={`container mx-auto px-4 text-center ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-pink-500 handwritten">Our Beautiful Moments</h2>
        
        <div 
          className="relative w-full max-w-5xl mx-auto rounded-lg shadow-lg overflow-hidden bg-pink-50"
          style={{ height: '500px' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
              <img 
                src={image.url} 
                alt={image.caption} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <p className="text-xl md:text-2xl handwritten">{image.caption}</p>
                <p className="text-sm opacity-80 mt-2">{image.date}</p>
              </div>
            </div>
          ))}
          
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm transition-all"
            onClick={goToPrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm transition-all"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="flex justify-center space-x-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-pink-500 scale-125' : 'bg-pink-200'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};