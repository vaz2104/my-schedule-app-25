import { NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard", "/panel"];
const publicRoutes = ["/login", "/"];

export default async function middleware(req) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  let isProtectedRoute = false;
  let isPublicRoute = false;

  protectedRoutes.forEach((route) => {
    if (path.startsWith(route)) {
      isProtectedRoute = true;
      return;
    }
  });
  publicRoutes.forEach((route) => {
    if (path.startsWith(route)) {
      isPublicRoute = true;
      return;
    }
  });

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    const pathParts = path.slice(1).split("/");
    console.log(pathParts);
    let query = "";
    if (pathParts[0] === "panel")
      query = `?panelID=${pathParts[1] || ""}&role=client`;
    if (pathParts[0] === "dashboard") query = `?role=admin`;

    return NextResponse.redirect(new URL(`/login${query}`, req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    session?.role === "admin" &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (
    session?.userId &&
    session?.role === "client" &&
    req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/panel", req.nextUrl));
  }

  if (
    session?.userId &&
    session?.role === "admin" &&
    req.nextUrl.pathname.startsWith("/panel")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // 6. Redirect to /platform if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    session?.role === "client" &&
    !req.nextUrl.pathname.startsWith("/panel")
  ) {
    return NextResponse.redirect(new URL("/panel", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
