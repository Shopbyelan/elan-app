import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const ADMIN_PATHS = ["/admin"];
const AUTH_PATHS = ["/orders", "/account"];
const GUEST_ONLY = ["/login", "/register", "/forgot-password"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth?.user;
  const isAdmin = req.auth?.user?.role === "ADMIN";

  // Admin routes — require ADMIN role
  if (ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  // Protected routes — require auth
  if (AUTH_PATHS.some((p) => pathname.startsWith(p)) && !isAuthenticated) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url));
  }

  // Guest-only routes — redirect authenticated users away
  if (GUEST_ONLY.some((p) => pathname === p) && isAuthenticated) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
