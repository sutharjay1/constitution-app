import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import db from "./db";
import { getCookie, getCookies, hasCookie } from "cookies-next";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  // const nextAuthSessionToken = getCookie("next-auth.session-token", { cookies })
  // const nextAuthCsrfToken = getCookie("next-auth.csrf-token", { cookies })
  // const isLoggedIn = getCookie("loggedIn", { cookies })

  // if (!isLoggedIn || !nextAuthSessionToken || !nextAuthCsrfToken) {
  //     return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}

// Commented out configuration for path matching
// export const config = {
//     matcher: ["/u/:path*", "/login"],
// };

export { default } from "next-auth/middleware";
