import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { cookies } from "next/headers";
import bcrypt from 'bcryptjs';

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and Password are required." }, { status: 400 });
//     }

//     // Query user from Sanity
//     const users = await client.fetch(`*[_type == "user" && email == $email]`, { email });

//     if (users.length === 0) {
//       return NextResponse.json({ error: "Customer not found" }, { status: 404 });
//     }

//     const user = users[0];

//     // TODO: Secure password validation (use bcrypt)
//     if (user.password !== password) {
//       return NextResponse.json({ error: "Invalid password" }, { status: 401 });
//     }

//     // Set cookie for authentication
//     cookies().set("IsLogin", "1", { httpOnly: true, path: "/" });

//     return NextResponse.json({ success: true });

//   } catch (error) {
//     return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
//   }
// }











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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Store userId in cookie
    cookies().set("userId", user._id, { httpOnly: true, secure: true, path: "/" });

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}













