import db from "@/lib/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import bcrypt from "bcrypt";

export default async function POST(req: NextApiRequest) {
  try {
    const { email, name, password } = req.body;

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email aken" },
        {
          status: 422,
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
