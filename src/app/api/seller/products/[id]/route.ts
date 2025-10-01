import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  role: "BASIC" | "SELLER" | "ADMIN";
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("cookie")?.split("=")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  if (decoded.role !== "SELLER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, description, price, image, categoryId } = await req.json();
  const productId = parseInt(params.id);

  const updated = await prisma.product.update({
    where: { id: productId, sellerId: decoded.id },
    data: {
      name,
      description,
      price,
      image,
      categoryId,
    },
  });

  return NextResponse.json(updated);
}
