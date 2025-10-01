// app/api/seller/dashboard/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: number;
}

/**
 * Helper to extract and verify JWT from cookies
 */
async function getDecodedToken(): Promise<DecodedToken | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
  } catch {
    return null;
  }
}

/**
 * GET seller dashboard
 */
export async function GET() {
  try {
    const decoded = await getDecodedToken();
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user and enforce DB-based SELLER check
    const seller = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        accountType: true,
        profile: {
          select: {
            bio: true,
            story: true,
            banner: true,
            location: true,
            website: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            image: true,
            ratings: { select: { rating: true } },
          },
        },
      },
    });

    if (!seller || seller.accountType.toLowerCase() !== "seller") {
      return NextResponse.json({ error: "Forbidden: Not a seller" }, { status: 403 });
    }

    return NextResponse.json(seller, { status: 200 });
  } catch (err) {
    console.error("Seller dashboard GET error:", err);
    return NextResponse.json({ error: "Failed to fetch dashboard" }, { status: 500 });
  }
}
