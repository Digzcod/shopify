import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getCookie, setCookie } from "cookies-next";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase_url = process.env.SUPABASE_URL as string;
  const supabase_key = process.env.SUPABASE_ANON_KEY as string;

  const supabase = createServerClient(
    supabase_url,
    supabase_key,
    {
      cookies: {
        getAll() {
         // Define the cookies type
         const cookieList: { name: string, value: string }[] = [];
         const allCookies = request.cookies.getAll();
         
         for (const cookie of allCookies) {
           cookieList.push({ name: cookie.name, value: cookie.value });
         }
         return cookieList;
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            setCookie(name, value, {
              req: request,
              res: supabaseResponse,
              ...options,
            });
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedRoutes = ['/lab', '/user', '/dashboard'];
  const authPages = ['/sign-in', '/sign-up'];

  if (!user && protectedRoutes.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  if (user && authPages.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/user'; // Consider redirecting to a user-specific landing page
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}


export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
