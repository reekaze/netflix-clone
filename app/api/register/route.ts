import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Username, email and password required" },
        {
          status: 201,
        }
      );
    }

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email has been taken" },
        {
          status: 201,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Server Error" },
      {
        status: 500,
      }
    );
  }
}
