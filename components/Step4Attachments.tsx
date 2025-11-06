import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import CheckIcon from './icons/CheckIcon';
import CadenceButton from './CadenceButton';


const Step4Attachments: React.FC<{ nextStep: () => void; prevStep: () => void; isFirstVisit: boolean; }> = ({ nextStep, prevStep, isFirstVisit }) => {
  const { theme } = useTheme();

  return (
    <div className="text-left max-w-3xl mx-auto">
      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`}>Results, Not Meetings.</h2>
      <hr style={{ borderColor: theme.colors.border }} className={`mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`} />
      <ol className="space-y-4 mb-10 text-lg text-gray-300 list-none">
        <li className={`flex items-start ${isFirstVisit ? 'animate-fade-in-left' : ''}`} style={{ animationDelay: '150ms' }}>
            <span className="font-bold mr-3" style={{color: theme.colors.accent}}>1.</span>
            <span><strong>You Submit the Brief:</strong> Complete the next few steps. It saves you a 60-minute call.</span>
        </li>
        <li className={`flex items-start ${isFirstVisit ? 'animate-fade-in-left' : ''}`} style={{ animationDelay: '300ms' }}>
            <span className="font-bold mr-3" style={{color: theme.colors.accent}}>2.</span>
            <span><strong>I Build Your Prototype:</strong> I review your vision and build a live, functional prototype for you to see.</span>
        </li>
        <li className={`flex items-start ${isFirstVisit ? 'animate-fade-in-left' : ''}`} style={{ animationDelay: '450ms' }}>
            <span className="font-bold mr-3" style={{color: theme.colors.accent}}>3.</span>
            <span><strong>Launch:</strong> Once approved, your final, bespoke asset goes live.</span>
        </li>
      </ol>

      <div className="flex justify-between items-center mt-12">
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

export default Step4Attachments;