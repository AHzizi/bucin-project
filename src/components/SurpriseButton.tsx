import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import confetti from '../utils/confetti';
import heartRain from '../utils/heartRain';

export const SurpriseButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSurpriseClick = () => {
    setIsModalOpen(true);
    
    // Start confetti and heart rain
    setTimeout(() => {
      confetti();
      heartRain();
    }, 300);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div ref={sectionRef} className="section surprise-section py-24 bg-gradient-to-b from-white to-pink-50">
      <div className={`container mx-auto px-4 text-center ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 to-pink-500"></div>
          
          <Heart className="text-pink-500 mx-auto mb-6 w-16 h-16 float" />
          
          <h2 className="text-3xl font-bold mb-6 text-pink-600 handwritten">Ada Sesuatu Yang Spesial Untukmu Saayang</h2>
          
          <p className="text-gray-700 mb-8">
            I've prepared something special just for you, my love. Are you ready for a surprise?
          </p>
          
          <button 
            className="romantic-button group relative inline-flex items-center justify-center"
            onClick={handleSurpriseClick}
          >
            <span className="mr-2">Click for a Surprise</span> 
            <span className="transform group-hover:scale-125 transition-transform">💝</span>
          </button>
        </div>
      </div>
      
      {/* Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`}>
        <div className="modal-content">
          <button className="close-button" onClick={closeModal}>×</button>
          
          <div className="text-center">
            <div className="text-5xl mb-4">❤️</div>
            <h3 className="text-3xl font-bold mb-4 text-pink-600 handwritten">I Love You!</h3>
            
            <p className="text-xl mb-6">
              One year of loving you has been the most beautiful journey of my life. 
              You make every day special with your smile, your kindness, and your love.
            </p>
            
            <p className="text-xl mb-8">
              Thank you for being the most amazing partner. Here's to many more 
              years of love, laughter, and happiness together!
            </p>
            
            <div className="text-3xl handwritten font-bold text-pink-500">Forever Yours ❤️</div>
          </div>
        </div>
      </div>
    </div>
  );
};