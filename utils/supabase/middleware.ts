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

//   if (
//     !user &&
//     !request.nextUrl.pathname.startsWith("/login") &&
//     !request.nextUrl.pathname.startsWith("/auth")
//   ) {
//     // no user, potentially respond by redirecting the user to the login page
//     const url = request.nextUrl.clone();
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

// IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
// creating a new response object with NextResponse.next() make sure to:
// 1. Pass the request in it, like so:
//    const myNewResponse = NextResponse.next({ request })
// 2. Copy over the cookies, like so:
//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
// 3. Change the myNewResponse object to fit your needs, but avoid changing
//    the cookies!
// 4. Finally:
//    return myNewResponse
// If this is not done, you may be causing the browser and server to go out
// of sync and terminate the user's session prematurely!
