import { currentUser } from "@/lib/currentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type MovieIdProps = {
  params: {
    movieId: string;
  };
};

export async function GET(
  req: NextRequest,
  { params: { movieId } }: MovieIdProps
) {
  try {
    const user = await currentUser();

    if (typeof movieId !== "string" || !movieId) {
      throw new Error("Invalid ID");
    }

    const movie = await db.movie.findUnique({
      where: {
        id: movieId || "",
      },
    });

    if (!movie) {
      throw new Error("Invalid ID");
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
