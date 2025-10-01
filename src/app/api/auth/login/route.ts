import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = loginSchema.parse(body);
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    
    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        accountType: user.accountType 
      },
      process.env.JWT_SECRET || "fallback-secret-key",
      { expiresIn: "7d" }
    );
    
    // Create response with user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;
    
    // Set HTTP-only cookie
    const response = NextResponse.json(
      { 
        message: "Login successful", 
        user: userWithoutPassword 
      },
      { status: 200 }
    );
    
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}