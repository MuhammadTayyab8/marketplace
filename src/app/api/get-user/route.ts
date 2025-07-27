// app/api/get-user/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Token not found" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    return NextResponse.json({ userId: decoded.id, role: decoded.role });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
