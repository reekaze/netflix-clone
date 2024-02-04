import { currentUser } from "@/lib/currentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();

    const movieCount = await db.movie.count();

    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await db.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0], { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
