// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  console.log("[Middleware] Incoming request:", req.nextUrl.pathname);
  console.log("[Middleware] Token from cookie:", token);

  if (!token) {
    return NextResponse.next(); // just pass through
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const result = await jwtVerify(token, secret);

    console.log("[Middleware] Token decoded successfully:", result.payload);

    return NextResponse.next();
  } catch (err) {
    console.error("[Middleware] JWT verification error:", err);
    return NextResponse.json(
      { error: "Invalid token", details: err instanceof Error ? err.message : err },
      { status: 403 }
    );
  }
}

export const config = {
  matcher: ["/api/:path*"], // applies to all API routes
};
