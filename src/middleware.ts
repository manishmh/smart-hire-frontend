import { authOptions } from "@/server/auth";
import {
  DEFAULT_LOGIN_REDIRECT_URL,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/server/routes";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authOptions);

export default auth((req) => {
  const { pathname, search } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  // every one can access isApiAuthRoute "/api/auth"
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // check access of auth routes "/login", "/register" and if user is logged in then redirect to DEFAULT_LOGIN_REDIRECT_URL else it is public 
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, req.url));
    }

    return NextResponse.next();
  }

  // if user is not logged in and it is not public route (i.e. if user is trying to access private routes) it will redirec to "/auth/login" 
  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    const callbackUrl = `${pathname}${search}`;
    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.url));
  }

  return NextResponse.next();
});

/**
 * matcher regex targets all the routes except the files that are mentioned like .next etc.
 * This matcher envokes middleware to the routes that is being targeted by matcher regex pattern
 * by default middleware is being envoked in all the routes.
 **/  
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
