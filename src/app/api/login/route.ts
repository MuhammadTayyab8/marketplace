import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
// Login API Route
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Query user from Sanity
    const users = await client.fetch(`*[_type == "user" && email == $email]`, { email });

    if (users.length === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const user = users[0];

    // Verify password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (password !== user.password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role || "user", // default to user
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );



    // Setup JWT
    cookies().set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });


    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Login API error:", error);  // Add this
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

