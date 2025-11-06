import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FormData } from '../types';
import EnvelopeIcon from './icons/SpinnerIcon';
import CadenceButton from './CadenceButton';

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  isFirstVisit: boolean;
  data: FormData;
  isSubmitting: boolean;
}

const getFeaturesText = (data: FormData): string => {
    const selectedFeatures = Object.keys(data.importantFeatures).filter(key => data.importantFeatures[key]);
    const allFeatures = [
      ...selectedFeatures,
      ...(data.importantFeaturesOther ? [`Other: ${data.importantFeaturesOther}`] : [])
    ];
    return allFeatures.length > 0 ? allFeatures.join(', ') : 'Not provided';
}

const ReviewSection: React.FC<{title: string, children: React.ReactNode, delay: number, isFirstVisit: boolean}> = ({title, children, delay, isFirstVisit}) => {
    const {theme} = useTheme();
    return (
        <div className={`${isFirstVisit ? 'animate-fade-in-left' : ''}`} style={{animationDelay: `${delay}ms`}}>
            <h3 className="text-xl font-bold mb-3" style={{ color: theme.colors.accent }}>{title}</h3>
            <div className="space-y-2 text-gray-300 bg-[#2a2a2a] p-4 rounded-sm">{children}</div>
        </div>
    );
};

const ReviewItem: React.FC<{label: string, value: string | undefined}> = ({label, value}) => (
    <div>
        <span className="font-semibold text-gray-100">{label}:</span>
        <span className="ml-2 break-words">{value || 'Not provided'}</span>
    </div>
);

const Step10Review: React.FC<Props> = ({ nextStep, prevStep, isFirstVisit, data, isSubmitting }) => {
  const { theme } = useTheme();
  
  return (
    <div className="text-left max-w-3xl mx-auto">
      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`}>Review Your Brief.</h2>
      <hr style={{ borderColor: theme.colors.border }} className={`mb-8 ${isFirstVisit ? 'animate-fade-in-down' : ''}`} />
      
      <div id="review-summary" className="space-y-6">
        <ReviewSection title="Your Details" delay={150} isFirstVisit={isFirstVisit}>
            <ReviewItem label="Full Name" value={data.fullName} />
            <ReviewItem label="Email Address" value={data.email} />
            <ReviewItem label="Company Website" value={data.hasNoWebsite ? "No website provided" : data.website} />
        </ReviewSection>

        <ReviewSection title="Key Features" delay={300} isFirstVisit={isFirstVisit}>
            <ReviewItem label="Selected Features" value={getFeaturesText(data)} />
        </ReviewSection>

        <ReviewSection title="Project Context" delay={450} isFirstVisit={isFirstVisit}>
            <ReviewItem label="Main Challenge" value={data.projectChallenge} />
            <ReviewItem label="Success Outcome" value={data.projectSuccess} />
        </ReviewSection>

        <ReviewSection title="Scope & Timeline" delay={600} isFirstVisit={isFirstVisit}>
            <ReviewItem label="Ideal Timeline" value={data.timeline} />
            <ReviewItem label="Attachment" value={data.attachment?.name} />
        </ReviewSection>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center mt-12 gap-6 sm:gap-4">
        <button onClick={prevStep} className="text-gray-400 hover:text-white font-semibold transition-colors duration-300">
          &larr; Back
        </button>
        <CadenceButton onClick={nextStep} disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Submit Project Brief</span>
                <EnvelopeIcon />
              </>
            )}
        </CadenceButton>
      </div>
    </div>
  );
};

export default Step10Review;