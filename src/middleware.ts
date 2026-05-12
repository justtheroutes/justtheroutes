import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {

  const isAdminRoute =
    request.nextUrl.pathname.startsWith(
      "/admin"
    );

  const isLoginRoute =
    request.nextUrl.pathname.startsWith(
      "/login"
    );

  const userEmail =
    request.cookies.get(
      "admin-email"
    )?.value;

  const allowedAdmin =
    "justtheroutes@gmail.com";

  if (
    isAdminRoute &&
    userEmail !== allowedAdmin
  ) {

    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );

  }

  if (
    isLoginRoute &&
    userEmail === allowedAdmin
  ) {

    return NextResponse.redirect(
      new URL(
        "/admin",
        request.url
      )
    );

  }

  return NextResponse.next();
}

export const config = {

  matcher: [
    "/admin/:path*",
    "/login",
  ],

};