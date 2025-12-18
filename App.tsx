
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AI_WORDS } from './constants';
import WordCard from './components/WordCard';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    })
  };

  const paginate = (newDirection: number) => {
    const nextIndex = currentIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < AI_WORDS.length) {
      setDirection(newDirection);
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-blue-500 to-blue-400 text-white pt-12 pb-16 px-4 text-center rounded-b-[4rem] shadow-lg mb-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold mb-3 drop-shadow-md"
          >
            AI Word <span className="text-yellow-300">Magic!</span> ✨
          </motion.h1>
          <p className="text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto">
            Swipe through and learn the magic of <span className="bg-yellow-400 px-2 rounded font-bold text-blue-900">ai</span> sounds!
          </p>
        </div>
      </header>

      {/* Navigation and Card Container */}
      <main className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        {/* Progress Counter */}
        <div className="mb-6 flex flex-col items-center">
          <span className="text-blue-800 font-bold text-xl mb-2">
            Word {currentIndex + 1} of {AI_WORDS.length}
          </span>
          <div className="w-64 h-3 bg-blue-100 rounded-full overflow-hidden border-2 border-blue-200">
            <motion.div 
              className="h-full bg-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / AI_WORDS.length) * 100}%` }}
              transition={{ type: 'spring', stiffness: 50 }}
            />
          </div>
        </div>

        <div className="relative w-full max-w-lg flex items-center justify-center min-h-[500px]">
          {/* Previous Button */}
          <button 
            onClick={() => paginate(-1)}
            disabled={currentIndex === 0}
            className={`absolute left-[-20px] md:left-[-60px] z-10 p-4 rounded-full shadow-lg transition-all border-4 border-white
              ${currentIndex === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500 text-blue-900 hover:scale-110 active:scale-95'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Swipeable Card Area */}
          <div className="w-full flex justify-center items-center overflow-visible">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full"
              >
                <WordCard wordData={AI_WORDS[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <button 
            onClick={() => paginate(1)}
            disabled={currentIndex === AI_WORDS.length - 1}
            className={`absolute right-[-20px] md:right-[-60px] z-10 p-4 rounded-full shadow-lg transition-all border-4 border-white
              ${currentIndex === AI_WORDS.length - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500 text-blue-900 hover:scale-110 active:scale-95'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnail Navigator (Optional) */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 max-w-2xl px-4">
          {AI_WORDS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 
                ${currentIndex === idx ? 'bg-blue-500 border-blue-600 w-8' : 'bg-blue-200 border-blue-300'}`}
              aria-label={`Go to word ${idx + 1}`}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-400 py-8">
        <p>© {new Date().getFullYear()} AI Word Magic Explorer • Powered by Gemini</p>
      </footer>
    </div>
  );
};

export default App;
