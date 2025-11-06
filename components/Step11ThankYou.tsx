import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Props {
  isFirstVisit: boolean;
}

const Step11ThankYou: React.FC<Props> = ({ isFirstVisit }) => {
  const { theme } = useTheme();

  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className={`mb-6 ${isFirstVisit ? 'animate-fade-scale-in' : ''}`}>
        <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 8.25L10.125 14.625L7.5 12" stroke={theme.colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C13.845 2.25 15.5835 2.76075 17.0625 3.65625" stroke={theme.colors.accent} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isFirstVisit ? 'animate-fade-in-down' : ''}`} style={{ animationDelay: '100ms' }}>Thank You.</h2>
      <p className={`text-lg text-gray-300 mb-8 ${isFirstVisit ? 'animate-fade-in-down' : ''}`} style={{ animationDelay: '250ms' }}>
        Thank you. I'll personally review your brief and send a proposal—including a link to your live prototype—within one business day.
      </p>
    </div>
  );
};

export default Step11ThankYou;