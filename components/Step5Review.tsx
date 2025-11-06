import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import CheckIcon from './icons/CheckIcon';
import CadenceButton from './CadenceButton';

const NumberedListItem: React.FC<{ number: number, children: React.ReactNode }> = ({ number, children }) => {
    const { theme } = useTheme();
    return (
        <li className="flex items-start text-base text-gray-300">
            <span className="font-bold mr-3" style={{color: theme.colors.accent}}>{number}.</span>
            <span>{children}</span>
        </li>
    );
};

const Step5Review: React.FC<{ nextStep: () => void; prevStep: () => void; isFirstVisit: boolean; }> = ({ nextStep, prevStep, isFirstVisit }) => {
    const { theme } = useTheme();
    return (
        <div className="text-left">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isFirstVisit ? 'animate-fade-in-down' : ''}`}>A Simple, Transparent Investment.</h2>
            <hr style={{ borderColor: theme.colors.border }} className={`mb-8 ${isFirstVisit ? 'animate-fade-in-down' : ''}`} />
            
            <div className="flex flex-col gap-8">
                {/* Launch Package */}
                <div className={`p-6 transition-transform duration-300 hover:-translate-y-1 ${isFirstVisit ? 'animate-fade-scale-in' : ''}`} style={{border: `1px solid ${theme.colors.border}`}}>
                    <h3 className="text-2xl font-bold mb-2" style={{color: theme.colors.accent}}>The Launch Package</h3>
                    <p className="text-3xl font-bold mb-4">R 8,999</p>
                    <p className="text-gray-300 italic mb-4">The essential, custom-coded solution to perfect your digital first impression. This package includes:</p>
                    <ol className="space-y-3 list-none">
                        <NumberedListItem number={1}>A complete custom-coded, branded "Smart Brief" portal.</NumberedListItem>
                        <NumberedListItem number={2}>A secure backend for all data and file uploads.</NumberedListItem>
                        <NumberedListItem number={3}>Deployment on a high-performance global network.</NumberedListItem>
                        <NumberedListItem number={4}>A full video walkthrough of the final product.</NumberedListItem>
                    </ol>
                </div>

                {/* Professional Package */}
                <div className={`p-6 transition-transform duration-300 hover:-translate-y-1 ${isFirstVisit ? 'animate-fade-scale-in' : ''}`} style={{border: `1px solid ${theme.colors.accent}`, animationDelay: '200ms'}}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <h3 className="text-2xl font-bold" style={{color: theme.colors.accent}}>The Professional Package</h3>
                      <div className="shrink-0 px-3 py-1 text-xs font-bold text-black rounded-full whitespace-nowrap self-start sm:self-auto" style={{backgroundColor: theme.colors.accent}}>
                          MOST POPULAR
                      </div>
                    </div>
                    <p className="text-3xl font-bold mb-4">R 13,999</p>
                    <p className="text-gray-300 italic mb-4">The complete, "white glove" solution to fully automate your client intake.</p>
                    <p className="text-gray-200 mb-4">Includes everything in the Launch Package, PLUS:</p>
                     <ol className="space-y-3 list-none">
                        <NumberedListItem number={1}><strong>Automated Email System:</strong> A custom-coded system that sends beautiful, branded confirmation emails to your new leads instantly.</NumberedListItem>
                        <NumberedListItem number={2}><strong>Private Project Dashboard:</strong> A dedicated dashboard to track your project's status from kickoff to completion for total peace of mind.</NumberedListItem>
                    </ol>
                </div>
            </div>

            <div className="flex justify-between items-center mt-12">
                <button
                    onClick={prevStep}
                    className="text-gray-400 hover:text-white font-semibold transition-colors duration-300"
                >
                    &larr; Back
                </button>
                <CadenceButton onClick={nextStep}>
                    <span>Start the Brief</span>
                    <CheckIcon />
                </CadenceButton>
            </div>
        </div>
    );
};

export default Step5Review;