import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import db from "./db";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret });
    const isAuthenticated = !!token;

    const { pathname } = req.nextUrl;

    // const user = await db.user.findFirst({
    //   where: {
    //     email: token?.email as string,
    //   },
    // });

    // if (isAuthenticated && user?.verified === true) {
    //   return NextResponse.redirect(new URL(`/u/${user.id}`, req.url));
    // }

    // const headerlist = headers();

    // const user_ip = headerlist.get("x-forwarded-for");

    // console.log(`user_ip`, user_ip);

    // if (isAuthenticated && pathname === "/login") {
    // return NextResponse.redirect(new URL("/u/* ", req.url));
    // }

    // if (!isAuthenticated && pathname.startsWith("/u")) {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ["/u/:path*", "/login"],
};

export { default } from "next-auth/middleware";