import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import CheckIcon from './icons/CheckIcon';
import CadenceButton from './CadenceButton';

const ListItem: React.FC<{ children: React.ReactNode, delay: number, isFirstVisit: boolean }> = ({ children, delay, isFirstVisit }) => {
    const { theme } = useTheme();
    return (
        <li className={`flex items-start text-lg text-gray-300 ${isFirstVisit ? 'animate-fade-in-left' : ''}`} style={{ animationDelay: `${delay}ms` }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill={theme.colors.accent}>
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{children}</span>
        </li>
    );
};


const Step3Vision: React.FC<{ nextStep: () => void; prevStep: () => void; isFirstVisit: boolean; }> = ({ nextStep, prevStep, isFirstVisit }) => {
  const { theme } = useTheme();
  const listItems = [
      { text: <><strong>Built with Intent:</strong> No templates. Every portal is custom-coded to be a seamless part of your brand.</> },
      { text: <><strong>Lightning-Fast:</strong> A purpose-built experience that loads instantly, turning a moment of friction into a moment of flow.</> },
      { text: <><strong>Flawlessly Reliable:</strong> Secure and professional, so you get the right information, every time.</> },
  ];

  return (
    <div className="text-left max-w-3xl mx-auto">
      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`}>A Bespoke First Impression.</h2>
      <hr style={{ borderColor: theme.colors.border }} className={`mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`} />
      <ul className="space-y-4 mb-10">
        {listItems.map((item, index) => (
            <ListItem key={index} delay={150 * (index + 1)} isFirstVisit={isFirstVisit}>
                {item.text}
            </ListItem>
        ))}
      </ul>
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

export default Step3Vision;