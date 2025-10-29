import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { SignUpSchema } from "@/schemas/signupSchema";
const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("Missing JWT_SECRET in environment");



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

const parsed = SignUpSchema.safeParse(body);        

if (!parsed.success) {
  return NextResponse.json(
    { error: parsed.error.issues[0].message },
    { status: 400 }
  );
}


    const { name, email, password } = parsed.data;


    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { message: "Signup successful", token },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
