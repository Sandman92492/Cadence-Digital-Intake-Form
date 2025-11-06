export interface Theme {
  colors: {
    background: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentHover: string;
    border: string;
    inputBackground: string;
    error: string;
  };
  typography: {
    fontFamily: string;
  };
  branding: {
    studioName: string;
    headline: string;
    subheadline: string;
  };
}
