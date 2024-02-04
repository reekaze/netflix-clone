import { currentUser } from "@/lib/currentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();

    const favorites = await db.favorite.findMany({
      where: {
        userId: user.id,
      },
      include: {
        movie: true,
      },
    });

    const favoriteMovies = favorites.map((fav) => fav.movie);

    return NextResponse.json(favoriteMovies, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
