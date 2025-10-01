import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Get token from cookie
    const token = req.cookies.get("auth-token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret-key") as any;
    
    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        accountType: true,
        about_me: true,
        createdAt: true,
        sellerProfile: true,
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            createdAt: true,
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile error:", error);
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}