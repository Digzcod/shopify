"use server";
import createClientServer from "@/utils/supabase/server";
import { setCookie } from "cookies-next";


export async function signInAction(
  email: string,
  password: string,
  remember: boolean
) {
  const supabase = createClientServer();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { message: error.message, status: 401 };
  }

  const maxAge = remember ? 30 * 24 * 60 * 60 : 5 * 60; // 30 days or 5 minutes

  // Setting the cookie with cookies-next
  setCookie("supabase-auth-token", data.session?.access_token || "", {
    maxAge,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return { message: "Sign in successful", status: 200, data };
}
