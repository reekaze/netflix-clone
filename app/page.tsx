import Logout from "@/components/Logout";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { currentUser } from "@/lib/currentUser";

type props = {
  req: NextApiRequest;
};

export default async function Home({ req }: props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth");
  }

  const user = await currentUser();

  return (
    <>
      <h1 className="text-2xl text-green-500">Netflix Clone</h1>
      <p className="text-white">{user.email}</p>
      <Logout />
    </>
  );
}
