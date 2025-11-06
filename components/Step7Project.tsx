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

const featureOptions = [
    "Seamless Brand Integration",
    "Automated Email Confirmations",
    "A Private Project Dashboard",
    "Secure File Uploads & Storage",
    "Your Budget"
];

const Step7Project: React.FC<Props> = ({ nextStep, prevStep, isFirstVisit, data, updateData }) => {
  const { theme } = useTheme();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isFeatureSelected = Object.values(data.importantFeatures).some(v => v);
    const isOtherFilled = data.importantFeaturesOther.trim() !== '';
    setIsFormValid(isFeatureSelected || isOtherFilled);
  }, [data]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateData(prev => ({
      ...prev,
      importantFeatures: {
        ...prev.importantFeatures,
        [name]: checked,
      }
    }));
  };

  return (
    <div className="text-left max-w-3xl mx-auto">
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isFirstVisit ? 'animate-fade-in-down' : ''}`}>To start, which features are most important to you?</h2>
      <p className={`text-lg text-gray-400 mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`}>This helps me understand your priorities from day one.</p>
      <hr style={{ borderColor: theme.colors.border }} className={`mb-8 ${isFirstVisit ? 'animate-fade-in-down' : ''}`} />
      
      <div className={isFirstVisit ? 'animate-fade-in-left' : ''} style={{ animationDelay: '150ms' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {featureOptions.map(option => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer p-3 rounded-sm transition-colors duration-200 hover:bg-white/5">
                <input type="checkbox" name={option} checked={!!data.importantFeatures[option]} onChange={handleCheckboxChange}
                       className="h-5 w-5 rounded-sm border-gray-500 bg-gray-700 text-yellow-500 focus:ring-yellow-500 shrink-0"
                       style={{'--tw-ring-offset-color': '#1D1D1D', '--tw-ring-color': theme.colors.accent} as React.CSSProperties} />
                <span className="text-gray-300">{option}</span>
              </label>
            ))}
          </div>
          <div className="mt-6">
             <label htmlFor="features-other" className="block text-gray-300 font-semibold mb-2">Anything else?</label>
             <input type="text" id="features-other" placeholder="Other important features or details..." value={data.importantFeaturesOther}
                     onChange={(e) => updateData(prev => ({...prev, importantFeaturesOther: e.target.value}))}
                     className="bg-transparent border-2 border-gray-600 focus:border-yellow-400 rounded-sm p-3 w-full transition-colors duration-300 focus:outline-none"
                     style={{'--tw-ring-color': theme.colors.accent} as React.CSSProperties} />
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

export default Step7Project;
