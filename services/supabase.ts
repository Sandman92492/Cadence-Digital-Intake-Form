import { createClient, SupabaseClient } from '@supabase/supabase-js';

// -----------------------------------------------------------------------------
// Your Supabase credentials have been integrated.
// -----------------------------------------------------------------------------
const supabaseUrl = 'https://syignkhifiisaubmegdi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5aWdua2hpZmlpc2F1Ym1lZ2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MzQ5NTEsImV4cCI6MjA3ODAxMDk1MX0.apqXxKBaUjxVDCngyRedxHnbrFvBsur_U-EunENN2Q4';

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error);
  }
} else {
  // This case should not be reached now that keys are hardcoded.
  console.error("Supabase credentials are missing.");
}

export { supabase };
