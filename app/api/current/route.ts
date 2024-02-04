import serverAuth from "@/lib/serverAuth";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    const { currentUser } = await serverAuth(req);

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
