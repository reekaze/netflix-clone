import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authOptions } from "./app/api/auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextApiRequest } from "next";
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_JWT_SECRET;

  const token = await getToken({
    req,
    secret,
  });

  if (
    !req.nextUrl.pathname.startsWith("/images") &&
    !req.nextUrl.pathname.startsWith("/auth") &&
    token === null
  ) {
    return NextResponse.redirect(new URL("/auth", req.url));
  } else if (req.nextUrl.pathname.startsWith("/auth") && token !== null) {
    return NextResponse.redirect(new URL("/profiles", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
