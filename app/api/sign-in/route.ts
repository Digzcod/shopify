

// import { NextRequest, NextResponse } from "next/server";
// import createClientServer from "@/utils/supabase/server";
// import { setCookie } from "cookies-next";

// export const dynamic = "force-dynamic";

// export async function POST(req: NextRequest) {
//   const supabase = createClientServer();
//   const { email, password, remember } = await req.json();
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return NextResponse.json({ message: error.message }, { status: 401 });
//   }
//   // Calculate maxAge or user login session based on the `remember` boolean
//   const maxAge = remember ? 30 * 24 * 60 * 60 : 5 * 60; // 30 days longer login or 5 minutes

//   // Create a response object to manipulate headers
//   const response = NextResponse.json(
//     { message: "Sign in successful", data },
//     { status: 200 }
//   );

//   // Set cookie with proper response object
//   setCookie("user", JSON.stringify(data.user), {
//     req,
//     res: response, // Pass the response object here
//     maxAge,
//     path: "/",
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//   });

//   return response;
// }
