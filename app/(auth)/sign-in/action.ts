

"use server";
import createClientServer from "@/utils/supabase/server";
import { cookies } from "next/headers";

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

  console.log(data)

  if (error) {
    return { message: error.message, status: 401 };
  }

  const maxAge = remember ? 30 * 24 * 60 * 60 : 5 * 60; // 30 days or 5 minutes

  const cookieStore = cookies();
  cookieStore.set("user", JSON.stringify(data.user), {
    maxAge,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return { message: "Sign in successful", status: 200, data };
}
