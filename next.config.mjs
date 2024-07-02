/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  },
};

export default nextConfig;

// SUPABASE_URL: "https://rgbtwqyegljuxlzkqwka.supabase.co",
// SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnYnR3cXllZ2xqdXhsemtxd2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1MzEwNDEsImV4cCI6MjAzNDEwNzA0MX0.VawX8RsClg0BM23Cx6_ZwGgHEB7KZGws9rwY0U1Y-k4"
