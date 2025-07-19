// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Middleware to check login state
// export function middleware(req: NextRequest) {
//   // Check the login cookie
//   const isLoggedIn = req.cookies.get("IsLogin")?.value === "1";

//   // If the user is not logged in and tries to access the /checkout page, redirect to the login page
//   if (!isLoggedIn && req.nextUrl.pathname === "/checkout") {
//     return NextResponse.redirect(new URL("/log-in", req.url));
//   }

//   // If the user is logged in and tries to access the /sign-up page, redirect to the home page (or other page)
//   if (isLoggedIn && req.nextUrl.pathname === "/sign-up") {
//     return NextResponse.redirect(new URL("/", req.url)); // Redirect to homepage (or another page)
//   }

//   return NextResponse.next(); // Allow other requests to continue
// }

// // Define which paths this middleware should apply to
// export const config = {
//   matcher: ["/checkout", "/sign-up"], // Protect these specific routes
// };



// import { cookies } from "next/headers"
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest){

//    // const isLoggedIn = req.cookies.get("IsLogin")?.value === "1";

//    const cookieStore = await cookies();

//    const IsLogin = request.cookies.get("IsLogin")?.value === "1";

//    if(!IsLogin && request.nextUrl.pathname === "/checkout"){
//     return NextResponse.redirect(new URL('/log-in', request.url))
//    }

//    if(IsLogin  && request.nextUrl.pathname === "/sign-up"){
//     return NextResponse.redirect(new URL('/', request.url))
//    }
// }

// export const config = {
//     matcher: ["/checkout", "/sign-up"],
//   }




import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  const { pathname } = request.nextUrl;

  if (!userId && pathname === "/checkout") {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }

  if (!userId && pathname === "/profile") {
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  if (userId && pathname === "/sign-up") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next(); // Allow the request to proceed if no redirection is needed
}

export const config = {
  matcher: ["/checkout", "/sign-up", "/profile"],
};
