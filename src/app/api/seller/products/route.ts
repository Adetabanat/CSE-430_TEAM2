import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { jwtVerify, JWTPayload } from "jose";

interface JwtPayload extends JWTPayload {
  id: number;
  role: "BASIC" | "SELLER" | "ADMIN";
}

// Helper to verify token from cookie
async function verifySellerToken(req: Request): Promise<JwtPayload | null> {
  const cookie = req.headers.get("cookie");
  const token = cookie?.split("=")[1];
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const result = await jwtVerify(token, secret);
    const payload = result.payload as JwtPayload;

    if (payload.role !== "SELLER") return null;
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

// POST → create product
export async function POST(req: Request) {
  const decoded = await verifySellerToken(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized or forbidden" }, { status: 401 });

  const { name, description, price, image, categoryId } = await req.json();

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      image,
      sellerId: decoded.id,
      categoryId,
    },
  });

  return NextResponse.json(product);
}

// GET → list products for logged-in seller
export async function GET(req: Request) {
  const decoded = await verifySellerToken(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized or forbidden" }, { status: 401 });

  const products = await prisma.product.findMany({
    where: { sellerId: decoded.id },
  });

  return NextResponse.json(products);
}
