import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import db from "./db";
import { signOut } from "next-auth/react";
import { authOptions } from "./authOptions";

export const currentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Not signed in");
  }

  const currentUser = await db.user.findUnique({
    where: {
      email: session.user?.email || "",
    },
  });

  if (!currentUser) {
    signOut();
    return redirect("/auth");
  }

  return currentUser;
};
