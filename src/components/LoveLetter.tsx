import React, { useState, useEffect, useRef } from 'react';

export const LoveLetter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const letterRef = useRef<HTMLDivElement>(null);

  // Hapus "Dari Miftakul Azizi" dari bagian awal
  const loveLetterContent = `Ainul Ma'rifah Tersayang,

Saat kita merayakan ulang tahun pertama hubungan kita, aku merasa sangat terharu dan bersyukur karena memilikimu dalam hidupku. Tahun lalu penuh dengan momen-momen indah yang tak terhitung jumlahnya, percakapan yang mendalam, mimpi bersama, dan cinta yang tumbuh semakin kuat setiap hari.

Kamu telah membawa begitu banyak kegembiraan, tawa, dan makna dalam hidupku. Senyummu mencerahkan hari-hari tergelapku, kebaikanmu menginspirasiku untuk menjadi lebih baik, dan cintamu memberiku kekuatan yang tidak pernah kuduga sebelumnya.

Aku menghargai setiap momen yang telah kita lalui bersama - dari kencan pertama kita hingga malam-malam tenang, dari petualangan kita hingga jalan-jalan sederhana kita sambil bergandengan tangan. Setiap kenangan bersamamu adalah harta yang kusimpan erat di hatiku.

Hari ini, aku ingin berjanji padamu bahwa aku akan terus mencintaimu, mendukungmu, dan mendampingimu dalam setiap perjalanan hidup. Aku berharap dapat menciptakan kenangan indah yang tak terhitung jumlahnya bersamamu.

Terima kasih telah menjadi dirimu sendiri, mencintaiku, dan membuat tahun lalu menjadi tahun terindah dalam hidupku.

Happy first anniversary, Cintakuu.

Dengan Sepenuh Hatiku,
Untukmu Selamanya`;

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

  // Efek ketik
  useEffect(() => {
    if (!isVisible) return;

    if (currentIndex < loveLetterContent.length) {
      const timeout = setTimeout(() => {
        setText(loveLetterContent.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 25);

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
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-pink-600 text-center handwritten">
             Dari Lubuk Hatiku Yang Paling Dalam
            </h2>
            
            <div className="love-letter prose prose-lg max-w-none">
              {text.split('\n\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className={`mb-4 ${index === 0 ? 'handwritten text-xl text-pink-600' : ''}`}
                >
                  {paragraph}
                </p>
              ))}

              {/* Tampilkan tanda tangan setelah semua teks selesai diketik */}
              {currentIndex === loveLetterContent.length && (
                <div className="text-pink-600 text-xl handwritten mt-12 text-right">
                  Dari Miftakul Azizi
                </div>
              )}
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
