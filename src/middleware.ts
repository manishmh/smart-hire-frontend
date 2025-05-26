import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const accessToken = request.cookies.get("accessToken")?.value;

  // if (!accessToken && request.nextUrl.pathname !== "/dashboard") {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], 
};
