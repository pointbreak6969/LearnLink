import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function verifyJWT(token: string) {
  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
  return await jwtVerify(token, secret);
}

export async function middleware(req: NextRequest) {

  const token = req.cookies.get("accessToken")?.value;
  const isProtected = req.nextUrl.pathname.startsWith("/");
  if (!isProtected) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    await verifyJWT(token);
    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: ["/settings"],
};

