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
 * GET seller profile
 */
export async function GET() {
  try {
    const decoded = await getDecodedToken();
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user and enforce DB-based SELLER check
    const seller = await prisma.user.findFirst({
      where: { id: decoded.id, accountType: "SELLER" },
      select: {
        id: true,
        name: true,
        email: true,
        products: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            image: true,
          },
        },
        profile: {
          select: {
            bio: true,
            story: true,
            banner: true,
            location: true,
            website: true,
          },
        },
      },
    });

    if (!seller) {
      return NextResponse.json(
        { error: "Seller profile not found or not a seller" },
        { status: 404 }
      );
    }

    return NextResponse.json(seller, { status: 200 });
  } catch (err) {
    console.error("Seller profile GET error:", err);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

/**
 * POST create seller profile
 */
export async function POST(req: Request) {
  try {
    const decoded = await getDecodedToken();
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, story, bio, banner, location, website } = body;

    if (!name || !story) {
      return NextResponse.json(
        { error: "Name and story are required" },
        { status: 400 }
      );
    }

    // Ensure profile doesn’t already exist
    const existingProfile = await prisma.sellerProfile.findUnique({
      where: { userId: decoded.id },
    });

    if (existingProfile) {
      return NextResponse.json(
        { error: "Seller profile already exists" },
        { status: 409 }
      );
    }

    // Step 1: Update user to SELLER
    await prisma.user.update({
      where: { id: decoded.id },
      data: { accountType: "SELLER", name },
    });

    // Step 2: Create SellerProfile
    const newProfile = await prisma.sellerProfile.create({
      data: { userId: decoded.id, bio, story, banner, location, website },
      include: {
        user: { select: { id: true, name: true, email: true, accountType: true } },
      },
    });

    return NextResponse.json(newProfile, { status: 201 });
  } catch (err) {
    console.error("Seller profile POST error:", err);
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
  }
}
