import React from 'react';
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

const Step8Scope: React.FC<Props> = ({ nextStep, prevStep, isFirstVisit, data, updateData }) => {
  const { theme } = useTheme();
  
  const timelineOptions = ["Within 2 weeks", "This month", "Next quarter", "Just exploring options"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      updateData(prev => ({ ...prev, attachment: e.target.files![0] }));
    } else {
      updateData(prev => ({...prev, attachment: null}));
    }
  };

  const selectStyle = `bg-transparent border-2 border-gray-600 rounded-sm p-3 w-full transition-colors duration-300 focus:outline-none focus:border-yellow-400 appearance-none`;

  return (
    <div className="text-left max-w-3xl mx-auto">
      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`}>Understanding the Scale.</h2>
      <hr style={{ borderColor: theme.colors.border }} className={`mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`} />
      
      <div className="space-y-8">
        <div className={isFirstVisit ? 'animate-fade-in-left' : ''} style={{ animationDelay: '150ms' }}>
          <label htmlFor="timeline" className="block text-gray-300 font-semibold mb-2">Ideal Timeline</label>
           <div className="relative">
            <select id="timeline" name="timeline" value={data.timeline} onChange={handleChange}
                    className={selectStyle} style={{'--tw-ring-color': theme.colors.accent} as React.CSSProperties}>
              <option value="" disabled>Select a timeline...</option>
              {timelineOptions.map(opt => <option key={opt} value={opt} className="bg-gray-800">{opt}</option>)}
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-1">When would you ideally like this system to be live?</p>
        </div>

        <div className={isFirstVisit ? 'animate-fade-in-left' : ''} style={{ animationDelay: '300ms' }}>
          <label htmlFor="attachment" className="block text-gray-300 font-semibold mb-2">Attach a File (Optional)</label>
          <p className="text-sm text-gray-400 mb-3">e.g., Your company logo, a design brief, or project documentation.</p>
          <input 
            type="file" 
            id="attachment" 
            name="attachment" 
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600"
          />
          {data.attachment && <p className="text-sm text-green-400 mt-2">Selected: {data.attachment.name}</p>}
        </div>
      </div>

      <div className="flex justify-between items-center mt-12">
        <button onClick={prevStep} className="text-gray-400 hover:text-white font-semibold transition-colors duration-300">
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

export default Step8Scope;