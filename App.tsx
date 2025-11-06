import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from './contexts/ThemeContext';
import { FormData } from './types';
import { supabase } from './services/supabase';
import Step1Contact from './components/Step1Contact';
import Step2Overview from './components/Step2Overview';
import Step3Vision from './components/Step3Vision';
import Step4Attachments from './components/Step4Attachments';
import Step5Review from './components/Step5Review';
import Step6Details from './components/Step6Details';
import Step7Project from './components/Step7Project';
import Step8Context from './components/Step8Context';
import Step8Scope from './components/Step8Scope';
import Step10Review from './components/Step10Review';
import Step11ThankYou from './components/Step11ThankYou';
import ProgressDots from './components/ProgressBar';

const TOTAL_STEPS = 11;

const initialFormData: FormData = {
  fullName: '',
  email: '',
  website: '',
  hasNoWebsite: false,
  importantFeatures: {},
  importantFeaturesOther: '',
  projectChallenge: '',
  projectSuccess: '',
  timeline: '',
  attachment: null,
  attachmentUrl: '',
};

const App: React.FC = () => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState(new Set([1]));
  const [animatingStep, setAnimatingStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      const next = currentStep + 1;
      if (!visitedSteps.has(next)) {
        setAnimatingStep(next);
        setVisitedSteps(prev => new Set(prev).add(next));
      } else {
        setAnimatingStep(0);
      }
      setCurrentStep(next);
    }
  }, [currentStep, visitedSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setAnimatingStep(0);
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Check if the Supabase client is initialized before proceeding.
    if (!supabase) {
      alert("Form submission is currently disabled. Please contact the site administrator.");
      console.error("Submission failed: Supabase client is not initialized.");
      return;
    }

    setIsSubmitting(true);

    try {
      let publicUrl = '';

      // 1. Get the file from the state and upload to Supabase Storage if it exists.
      if (formData.attachment) {
        const file = formData.attachment;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('project-briefs') // Your bucket name
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        // 2. Get the publicly accessible URL of the uploaded file.
        const { data: urlData } = supabase.storage
          .from('project-briefs')
          .getPublicUrl(filePath);
        
        if (!urlData) {
            throw new Error("Could not get public URL for the uploaded file.");
        }
        publicUrl = urlData.publicUrl;
      }

      // 3. Prepare the data for insertion into the Supabase table.
      const selectedFeatures = Object.keys(formData.importantFeatures).filter(key => formData.importantFeatures[key]);
      const finalFeatures = [
        ...selectedFeatures,
        ...(formData.importantFeaturesOther ? [`Other: ${formData.importantFeaturesOther}`] : [])
      ].join(', ');


      const briefData = {
        full_name: formData.fullName,
        email: formData.email,
        website: formData.website,
        purpose: "Project Brief", // Static value as this is no longer a distinct user choice
        essential_info: finalFeatures, // Use the new features string here
        project_challenge: formData.projectChallenge,
        project_success: formData.projectSuccess,
        timeline: formData.timeline,
        attachment_url: publicUrl, // Include the file URL
      };

      // 4. Insert the new row into the 'briefs' table.
      const { error: insertError } = await supabase
        .from('briefs')
        .insert([briefData]);

      if (insertError) {
        throw insertError;
      }

      console.log("Submission successful.");
      nextStep(); // Go to Thank You page on success

    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      let errorMessage = 'An unknown error occurred. Please try again.';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'message' in error && typeof (error as { message: unknown }).message === 'string') {
        errorMessage = (error as { message: string }).message;
      } else if (typeof error === 'string' && error) {
        errorMessage = error;
      } else {
        // As a fallback, try to stringify the error to provide more details.
        try {
          const potentialMessage = JSON.stringify(error);
          // Avoid showing an empty object '{}' or 'null' as the error.
          if (potentialMessage && potentialMessage !== '{}' && potentialMessage !== 'null') {
            errorMessage = potentialMessage;
          }
        } catch {
          // If stringification fails (e.g., circular reference), stick with the default message.
        }
      }
      
      alert(`Sorry, something went wrong during submission: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (currentStep > 5 && currentStep < 10) return;
      if (event.key === 'ArrowRight' && currentStep !== 10) { // Disable for review step
        nextStep();
      } else if (event.key === 'ArrowLeft') {
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextStep, prevStep, currentStep]);
  
  const renderCurrentSlide = () => {
    const shouldAnimate = animatingStep === currentStep;
    switch (currentStep) {
      case 1:
        return <Step1Contact nextStep={nextStep} isFirstVisit={shouldAnimate} />;
      case 2:
        return <Step2Overview nextStep={nextStep} prevStep={prevStep} isFirstVisit={shouldAnimate} />;
      case 3:
        return <Step3Vision nextStep={nextStep} prevStep={prevStep} isFirstVisit={shouldAnimate} />;
      case 4:
        return <Step4Attachments nextStep={nextStep} prevStep={prevStep} isFirstVisit={shouldAnimate} />;
      case 5:
        return <Step5Review nextStep={nextStep} prevStep={prevStep} isFirstVisit={shouldAnimate} />;
      case 6:
        return <Step6Details nextStep={nextStep} prevStep={prevStep} isFirstVisit={shouldAnimate} data={formData} updateData={setFormData} />;
      case 7:
        return <Step7Project nextStep={nextStep} prevStep={prevStep} isFirstVisit={shouldAnimate} data={formData} updateData={setFormData} />;
      case 8:
        return <Step8Context nextStep={nextStep} prevStep={prevStep} isFirstVisit={shouldAnimate} data={formData} updateData={setFormData} />;
      case 9:
        return <Step8Scope nextStep={nextStep} prevStep={prevStep} isFirstVisit={shouldAnimate} data={formData} updateData={setFormData} />;
      case 10:
        return <Step10Review nextStep={handleSubmit} prevStep={prevStep} isFirstVisit={shouldAnimate} data={formData} isSubmitting={isSubmitting} />;
      case 11:
        return <Step11ThankYou isFirstVisit={shouldAnimate} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: theme.colors.background, fontFamily: theme.typography.fontFamily }}
    >
      <div className="w-full max-w-4xl bg-[#1D1D1D] text-white p-8 sm:p-12 md:p-16 rounded-md shadow-2xl">
        <div className="form-step">
          {renderCurrentSlide()}
        </div>
        <ProgressDots totalSteps={TOTAL_STEPS} currentStep={currentStep} />
      </div>
    </div>
  );
};

export default App;