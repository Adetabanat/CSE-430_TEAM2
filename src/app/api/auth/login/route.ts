import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[DEBUG] Request body:', body);

    const { email, password } = body;

    if (!email || !password) {
      console.log('[DEBUG] Missing email or password');
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Look up user in DB
    const user = await prisma.user.findUnique({ where: { email } });
    console.log('[DEBUG] Fetched user from DB:', user);

    if (!user) {
      console.log('[DEBUG] User not found in DB');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('[DEBUG] Password match:', passwordMatch);

    if (!passwordMatch) {
      console.log('[DEBUG] Invalid password for user:', user.email);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Sign JWT using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT({ id: user.id, role: user.accountType })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    console.log('[DEBUG] Generated JWT for user:', user.id, 'role:', user.accountType);

    // Return JWT in HttpOnly cookie
    const response = NextResponse.json({
      success: true,
      user: { id: user.id, role: user.accountType, name: user.name, email: user.email }
    }, { status: 200 });

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60,
      path: '/',
    });

    console.log('[DEBUG] Cookie set with token for user:', user.id);

    return response;

  } catch (err: unknown) {
    console.error('[DEBUG] Login error:', err);
    return NextResponse.json(
      { error: 'Something went wrong', details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
