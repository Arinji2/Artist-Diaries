import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://vdxbhbwecyppdakmingq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkeGJoYndlY3lwcGRha21pbmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk2NDIxNjQsImV4cCI6MTk5NTIxODE2NH0.AFxHxPlgPrtzJFvk3rmUN-Zaxuro3LfA7H_nNTldCu0"
);
