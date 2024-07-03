import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase_url = process.env.SUPABASE_URL as string;
  const supabase_key = process.env.SUPABASE_ANON_KEY as string;
  const supabase = createServerClient(supabase_url, supabase_key, {
    cookies: {
      getAll() {
        // return request.cookies.getAll();
        return cookies().getAll(); // using cookie
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          // request.cookies.set(name, value)
          cookies().set(name, value, options)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          // supabaseResponse.cookies.set(name, value, options)
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedRoutes = ["/lab", "/user", "/dashboard"];
  const authPages = ["/sign-in", "/sign-up"];

  if (!user && protectedRoutes.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (user && authPages.includes(request.nextUrl.pathname)) {
    // console.log('Redirecting away from auth page:', req.nextUrl.pathname); // Debugging output
    const url = request.nextUrl.clone();
    url.pathname = "/user"; // Consider redirecting to a user-specific landing page
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}


