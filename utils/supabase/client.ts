import { createBrowserClient } from "@supabase/ssr";

function createClient() {
  const supabase_url = process.env.SUPABASE_URL as string;
  const supabase_key = process.env.SUPABASE_ANON_KEY as string;
  return createBrowserClient(supabase_url, supabase_key);
}

export default createClient;