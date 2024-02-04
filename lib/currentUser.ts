import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import db from "./db";

export const currentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth");
  }

  const currentUser = await db.user.findUnique({
    where: {
      email: session.user?.email || "",
    },
  });

  if (!currentUser) {
    return redirect("/auth");
  }

  return currentUser;
};
