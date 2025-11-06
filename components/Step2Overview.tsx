import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import CheckIcon from './icons/CheckIcon';
import CadenceButton from './CadenceButton';

const Step2Overview: React.FC<{ nextStep: () => void; prevStep: () => void; isFirstVisit: boolean; }> = ({ nextStep, prevStep, isFirstVisit }) => {
  const { theme } = useTheme();
  return (
    <div className="text-left max-w-3xl mx-auto">
      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`}>The Digital Limp Handshake.</h2>
      <hr style={{ borderColor: theme.colors.border }} className={`mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`} />
      <p className={`text-lg text-gray-300 mb-4 ${isFirstVisit ? 'animate-fade-in-down' : ''}`} style={{ animationDelay: '150ms' }}>
        Ever get that feeling? You land on a website for a business that's clearly top-tier. Their work is incredible, their brand is sharp... and then you click "Contact Us" and land on a clunky, generic form.
      </p>
      <p className={`text-lg text-gray-200 font-semibold mb-10 ${isFirstVisit ? 'animate-fade-in-down' : ''}`} style={{ animationDelay: '300ms' }}>
        That moment of disconnect is what I fix.
      </p>
      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          className="text-gray-400 hover:text-white font-semibold transition-colors duration-300"
        >
          &larr; Back
        </button>
        <CadenceButton onClick={nextStep}>
          <span>Next</span>
          <CheckIcon />
        </CadenceButton>
      </div>
    </div>
  );
};

export default Step2Overview;