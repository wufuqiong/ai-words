
import React, { useState, useEffect } from 'react';
import { AIWord, WordState } from '../types';
import { generateWordImage, speakWord } from '../services/geminiService';

interface WordCardProps {
  wordData: AIWord;
}

const WordCard: React.FC<WordCardProps> = ({ wordData }) => {
  const [state, setState] = useState<WordState>({ loading: false });

  const fetchImage = async () => {
    setState({ loading: true });
    try {
      const url = await generateWordImage(wordData.word);
      setState({ imageUrl: url, loading: false });
    } catch (err) {
      setState({ loading: false, error: "Oops! Couldn't make a picture right now." });
    }
  };

  useEffect(() => {
    fetchImage();
  }, [wordData.word]);

  const handleSpeak = () => {
    speakWord(wordData.word);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition hover:scale-105 duration-300 border-4 border-yellow-200">
      <div className="relative aspect-square bg-blue-100 flex items-center justify-center">
        {state.loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-blue-500 font-medium">Creating magic...</p>
          </div>
        ) : state.imageUrl ? (
          <img 
            src={state.imageUrl} 
            alt={wordData.word} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="p-4 text-center">
             <p className="text-red-400">{state.error || "Click to retry"}</p>
             <button 
              onClick={fetchImage}
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-full text-sm"
             >
               Retry
             </button>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-4xl font-bold text-blue-600 capitalize">
            {wordData.word.split('ai').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && <span className="text-yellow-500 underline decoration-wavy decoration-yellow-300">ai</span>}
              </React.Fragment>
            ))}
          </h2>
          <button 
            onClick={handleSpeak}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-md transition-colors"
            aria-label="Speak word"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 text-lg mb-4 italic">"{wordData.definition}"</p>
        <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100">
          <p className="text-gray-800 text-sm">
            <span className="font-bold text-yellow-600">Sentence: </span>
            {wordData.example}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
