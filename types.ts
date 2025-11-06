export interface FormData {
  fullName: string;
  email: string;
  website: string;
  hasNoWebsite: boolean;
  importantFeatures: { [key: string]: boolean }; // e.g., { "Seamless Brand Integration": true }
  importantFeaturesOther: string; // Stores custom text for other features
  projectChallenge: string;
  projectSuccess: string;
  timeline: string;
  attachment?: File | null;
  attachmentUrl?: string;
}