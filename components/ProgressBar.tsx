import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ProgressDotsProps {
  totalSteps: number;
  currentStep: number;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ totalSteps, currentStep }) => {
  const { theme } = useTheme();
  const dots = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-3 mt-8">
      {dots.map((step) => (
        <div
          key={step}
          className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: step === currentStep ? theme.colors.accent : theme.colors.border,
          }}
          aria-current={step === currentStep ? 'step' : undefined}
        />
      ))}
    </div>
  );
};

export default ProgressDots;