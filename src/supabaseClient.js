import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fctekrdlplbjmjywsuvp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjdGVrcmRscGxiam1qeXdzdXZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MjI5NjUsImV4cCI6MjA2MzE5ODk2NX0.zaZBfZFX2rztk1kjRPasduHwJBVPVke5ZBQ7tGtNIOw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
