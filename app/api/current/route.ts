import { currentUser } from "@/lib/currentUser";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    const user = await currentUser();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
