import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ibzuwmuwnbtsjjfkremv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlienV3bXV3bmJ0c2pqZmtyZW12Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NjQzNzM3MCwiZXhwIjoyMDEyMDEzMzcwfQ.v7LEhYvmom_Ls6PfdhsktYTkHNGJuzTSqMXUSuGCFMg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
