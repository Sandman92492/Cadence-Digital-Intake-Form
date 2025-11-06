import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface CadenceButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const CadenceButton: React.FC<CadenceButtonProps> = ({ onClick, children, disabled, className = '' }) => {
  const { theme } = useTheme();
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group inline-flex items-center justify-center px-6 py-3 text-black font-bold text-lg rounded-sm transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${className}`}
      style={{
        backgroundColor: theme.colors.accent,
        boxShadow: '6px 6px 0px #000000',
        color: '#111111',
      }}
    >
      {children}
    </button>
  );
};

export default CadenceButton;