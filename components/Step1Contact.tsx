
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import CheckIcon from './icons/CheckIcon';
import CadenceButton from './CadenceButton';

const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme } = useTheme();
    return (
        <span 
            className="bg-[#2a2a2a] px-2 py-1 rounded-sm" 
            style={{
                color: theme.colors.accent,
                textShadow: '2px 2px 0px #111111'
            }}>
            {children}
        </span>
    );
};

const Step1Contact: React.FC<{ nextStep: () => void, isFirstVisit: boolean }> = ({ nextStep, isFirstVisit }) => {
  return (
    <div className="text-center flex flex-col items-center">
      <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight md:leading-tight lg:leading-tight mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`}>
        Set the right <Highlight>rhythm</Highlight><br />from the first click.
      </h1>
      <p className={`text-lg md:text-xl text-gray-300 mb-12 max-w-2xl ${isFirstVisit ? 'animate-fade-in-down' : ''}`} style={{ animationDelay: '150ms' }}>
        Turn your first point of contact into your most powerful brand statement.
      </p>
      <div className={`${isFirstVisit ? 'animate-fade-in-down' : ''}`} style={{ animationDelay: '300ms' }}>
        <CadenceButton onClick={nextStep}>
            <span>Start the Brief</span>
            <CheckIcon />
        </CadenceButton>
      </div>
    </div>
  );
};

export default Step1Contact;