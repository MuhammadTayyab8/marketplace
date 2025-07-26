import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyJWT(token: string, secret: string) {
  const encoder = new TextEncoder();
  const { payload } = await jwtVerify(token, encoder.encode(secret));
  return payload;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || null;
  const pathname = request.nextUrl.pathname;

  console.log("Token:", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  console.log("Pathname:", pathname);

  const protectedAdminPaths = ["/dashboard"];

  if (!token && pathname === "/checkout") {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }

  if (!token && pathname === "/profile") {
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  if (token && (pathname === "/sign-up" || pathname === "/log-in")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (protectedAdminPaths.some(path => pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/log-in", request.url));
    }

    try {
      const decoded: any = await verifyJWT(token, process.env.JWT_SECRET!);
      console.log("Decoded Role:", decoded.role);

      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (err) {
      console.log("JWT error:", err);
      return NextResponse.redirect(new URL("/log-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/sign-up", "/profile", "/dashboard", "/log-in"],
};
