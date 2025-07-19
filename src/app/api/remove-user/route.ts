// app/api/get-user/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value; // Get userId before deleting
  cookieStore.delete("userId"); // Delete the cookie

  return NextResponse.json({ userId });
}
