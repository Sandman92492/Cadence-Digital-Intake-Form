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

const Step6Details: React.FC<Props> = ({ nextStep, prevStep, isFirstVisit, data, updateData }) => {
  const { theme } = useTheme();
  const [errors, setErrors] = useState({ fullName: '', email: '', website: '' });
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = '';
    if (!value) {
      error = 'This field is required.';
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Please enter a valid email address.';
    } else if (name === 'website' && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)) {
       error = 'Please enter a valid URL.';
    }
    return error;
  };
  
  useEffect(() => {
    const validationErrors = {
      fullName: validateField('fullName', data.fullName),
      email: validateField('email', data.email),
      website: data.hasNoWebsite ? '' : validateField('website', data.website),
    };
    const hasNoErrors = Object.values(validationErrors).every(e => e === '');
    // FIX: Coerce the result of the logical expression to a boolean to prevent type errors.
    const hasRequiredFields = !!(data.fullName && data.email && (data.website || data.hasNoWebsite));
    setIsFormValid(hasNoErrors && hasRequiredFields);
  }, [data]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'website' && value) {
        updateData(prev => ({ ...prev, [name]: value, hasNoWebsite: false }));
    } else {
        updateData(prev => ({ ...prev, [name]: value }));
    }
    const error = validateField(name, value);
    setErrors(prev => ({...prev, [name]: error}));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    updateData(prev => ({
      ...prev,
      hasNoWebsite: isChecked,
      website: isChecked ? '' : prev.website
    }));
    if (isChecked) {
      setErrors(prev => ({ ...prev, website: '' }));
    }
  };


  const inputStyle = `bg-transparent border-2 rounded-sm p-3 w-full transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <div className="text-left max-w-3xl mx-auto">
      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`}>Let's Start with the Basics.</h2>
      <hr style={{ borderColor: theme.colors.border }} className={`mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`} />
      
      <div className="space-y-6">
        <div className={isFirstVisit ? 'animate-fade-in-left' : ''} style={{ animationDelay: '150ms' }}>
          <label htmlFor="fullName" className="block text-gray-300 font-semibold mb-2">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={data.fullName} onChange={handleChange} required aria-required="true"
                 className={`${inputStyle} ${errors.fullName ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'}`}
                 style={{'--tw-ring-color': theme.colors.accent} as React.CSSProperties} />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div className={isFirstVisit ? 'animate-fade-in-left' : ''} style={{ animationDelay: '300ms' }}>
          <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">Email Address</label>
          <input type="email" id="email" name="email" value={data.email} onChange={handleChange} required aria-required="true"
                 className={`${inputStyle} ${errors.email ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'}`} 
                 style={{'--tw-ring-color': theme.colors.accent} as React.CSSProperties} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className={isFirstVisit ? 'animate-fade-in-left' : ''} style={{ animationDelay: '450ms' }}>
          <label htmlFor="website" className="block text-gray-300 font-semibold mb-2">Company Website</label>
          <input type="url" id="website" name="website" value={data.website} onChange={handleChange} required aria-required="true" placeholder="https://example.com"
                 disabled={data.hasNoWebsite}
                 className={`${inputStyle} ${errors.website ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'}`} 
                 style={{'--tw-ring-color': theme.colors.accent} as React.CSSProperties} />
          {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
           <div className="mt-3 flex items-center">
              <input 
                type="checkbox" 
                id="no-website" 
                name="no-website" 
                checked={data.hasNoWebsite}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-500 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
                style={{'--tw-ring-offset-color': '#1D1D1D', '--tw-ring-color': theme.colors.accent} as React.CSSProperties}
              />
              <label htmlFor="no-website" className="ml-2 text-sm text-gray-300">I don't have a website</label>
            </div>
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

export default Step6Details;