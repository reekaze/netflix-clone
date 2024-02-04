import { currentUser } from "@/lib/currentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    const { movieId } = await req.json();

    const existingMovie = await db.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const isFavorited = await db.favorite.findFirst({
      where: {
        movieId,
        userId: user.id,
      },
    });

    if (isFavorited) {
      throw new Error("Already favorited");
    }

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        favorite: {
          create: {
            movieId,
          },
        },
      },
      include: {
        favorite: true,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser();

    const { movieId } = await req.json();

    const existingMovie = await db.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const isFavorited = await db.favorite.findFirst({
      where: {
        movieId,
        userId: user.id,
      },
    });

    if (!isFavorited) {
      throw new Error("Not favorited");
    }

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        favorite: {
          deleteMany: {
            movieId,
          },
        },
      },
      include: {
        favorite: true,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
