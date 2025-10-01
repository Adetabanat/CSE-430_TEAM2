import {prisma} from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {email, password }=body;

    const existingUserEmail = await prisma.user.findUnique({ where: { email: email } });
    if (existingUserEmail){
        return NextResponse.json({user: null, messsage: "user with this email already exist" },{ status: 409 })
    }

   
    const hashedPassword = await hash(password,10)
    const newUser =await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name:
        }
    })


    return NextResponse.json({user: newUser, message: "User created successfully"},{status: 201});
  } catch (error) {
  }
}
