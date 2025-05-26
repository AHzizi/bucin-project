import React, { useState, useEffect, useRef } from 'react';

export const LoveLetter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const letterRef = useRef<HTMLDivElement>(null);
  
  const loveLetterContent = `My dearest Ainul Ma'rifah,

As we celebrate our first anniversary, I find myself overwhelmed with emotions and gratitude for having you in my life. This past year has been filled with countless beautiful moments, deep conversations, shared dreams, and a love that grows stronger each day.

You've brought so much joy, laughter, and meaning into my life. Your smile brightens my darkest days, your kindness inspires me to be better, and your love gives me strength I never knew I had.

I cherish every moment we've spent together - from our first date to our quiet evenings at home, from our adventures to our simple walks hand in hand. Each memory with you is a treasure I hold close to my heart.

Today, I want to promise you that I'll continue to love you, support you, and stand by your side through all of life's journeys. I look forward to creating countless more beautiful memories with you.

Thank you for being you, for loving me, and for making this past year the most wonderful of my life.

Happy first anniversary, my love.

With all my heart,
Yours forever`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (letterRef.current) {
      observer.observe(letterRef.current);
    }

    return () => {
      if (letterRef.current) {
        observer.unobserve(letterRef.current);
      }
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!isVisible) return;

    if (currentIndex < loveLetterContent.length) {
      const timeout = setTimeout(() => {
        setText(loveLetterContent.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 25); // Speed of typing

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isVisible, loveLetterContent]);

  return (
    <section ref={letterRef} className="section love-letter-section py-24 bg-gradient-to-b from-pink-50 to-white">
      <div className={`container mx-auto px-4 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg relative">
          <div 
            className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4064432/pexels-photo-4064432.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-5 rounded-lg"
          ></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-pink-600 text-center handwritten">From My Heart to Yours</h2>
            
            <div className="love-letter prose prose-lg max-w-none">
              {text.split('\n\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className={`mb-4 ${index === 0 ? 'handwritten text-xl text-pink-600' : ''}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-block">
                <svg 
                  className="w-10 h-10 text-pink-400 mx-auto" 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};