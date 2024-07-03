import createClientServer from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const supabase = createClientServer();

  // Exchange the code for a session
  const { data: session, error } = await supabase.auth.exchangeCodeForSession(
    code as string
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Set the session cookie
  cookies().set({
    name: "supabase-auth-token",
    value: session?.session?.access_token,
    httpOnly: true, // makes the cookie accessible only through HTTP
    secure: process.env.NODE_ENV === "production", // ensures the cookie is only sent over HTTPS in production
    maxAge: 5 * 60, // set cookie to expire in 1 days
    path: "/", // root path, makes the cookie available site-wide
  });

  // Return the session or some other response
  return NextResponse.json(url.origin);
}
