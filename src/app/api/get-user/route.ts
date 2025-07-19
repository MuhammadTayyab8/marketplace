// app/api/get-user/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = cookies().get("userId")?.value;
  return NextResponse.json({ userId });
}
