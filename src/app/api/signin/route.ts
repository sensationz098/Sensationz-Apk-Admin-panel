import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  console.log("user in signin route",user)
  if (!user || user.password !== password)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

const token = jwt.sign(
  { id: user.id, role: user.role, name: user.name },
  process.env.JWT_SECRET!,
  { expiresIn: "7d" }
);

  return NextResponse.json({
    token,
    role: user.role,
    message: "Signed in successfully",
  });
}
