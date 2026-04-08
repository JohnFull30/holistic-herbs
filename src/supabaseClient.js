import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gkgkeeteaoxzhpotgwjc.supabase.co";
const supabaseAnonKey = "sb_publishable_S20uNwA25_IlGkvk_ClK_Q_MwUkmcVy";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
