import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET → return all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" }, // optional: sort alphabetically
    });

    return NextResponse.json(categories);
  } catch (error: unknown) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
