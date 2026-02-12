import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

interface AuthJwtPayload extends JWTPayload {
  id: string;
  role: string;
}

async function verifyToken(token: string): Promise<AuthJwtPayload | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify<AuthJwtPayload>(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Require any token for protected routes
  if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    const decoded = await verifyToken(token);

    // If token is invalid, send back to login
    if (!decoded) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Only allow admins into /admin
    if (pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
