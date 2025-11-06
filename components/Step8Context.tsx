import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FormData } from '../types';
import CheckIcon from './icons/CheckIcon';
import CadenceButton from './CadenceButton';

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  isFirstVisit: boolean;
  data: FormData;
  updateData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step8Context: React.FC<Props> = ({ nextStep, prevStep, isFirstVisit, data, updateData }) => {
  const { theme } = useTheme();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(data.projectChallenge.trim() !== '' && data.projectSuccess.trim() !== '');
  }, [data]);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData(prev => ({ ...prev, [name]: value }));
  };
  
  const textareaStyle = `bg-transparent border-2 border-gray-600 rounded-sm p-3 w-full transition-colors duration-300 focus:outline-none focus:border-yellow-400 min-h-[100px] resize-y`;

  return (
    <div className="text-left max-w-3xl mx-auto">
      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`}>Tell Me a Bit More.</h2>
      <hr style={{ borderColor: theme.colors.border }} className={`mb-8 ${isFirstVisit ? 'animate-fade-in-down' : ''}`} />
      
      <div className="space-y-8">
        <div className={isFirstVisit ? 'animate-fade-in-left' : ''} style={{ animationDelay: '150ms' }}>
          <label htmlFor="projectChallenge" className="block text-gray-300 font-semibold mb-2">What's the main challenge you're hoping to solve?</label>
          <textarea
            id="projectChallenge"
            name="projectChallenge"
            value={data.projectChallenge}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="e.g., Our current contact form is generic and doesn't reflect our premium brand..."
            className={textareaStyle}
            style={{'--tw-ring-color': theme.colors.accent} as React.CSSProperties}
          />
        </div>

        <div className={isFirstVisit ? 'animate-fade-in-left' : ''} style={{ animationDelay: '300ms' }}>
          <label htmlFor="projectSuccess" className="block text-gray-300 font-semibold mb-2">What does a successful outcome look like for you?</label>
          <textarea
            id="projectSuccess"
            name="projectSuccess"
            value={data.projectSuccess}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="e.g., A seamless, impressive first impression that captures all the info we need..."
            className={textareaStyle}
            style={{'--tw-ring-color': theme.colors.accent} as React.CSSProperties}
          />
        </div>
      </div>


      <div className="flex justify-between items-center mt-12">
        <button onClick={prevStep} className="text-gray-400 hover:text-white font-semibold transition-colors duration-300">
          &larr; Back
        </button>
        <CadenceButton onClick={nextStep} disabled={!isFormValid}>
          <span>Next</span>
          <CheckIcon />
        </CadenceButton>
      </div>
    </div>
  );
};

export default Step8Context;