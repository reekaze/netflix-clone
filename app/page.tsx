import { NextApiRequest } from "next";
import { currentUser } from "@/lib/currentUser";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import AllList from "@/components/AllList";

type props = {
  req: NextApiRequest;
};

export default async function Home({ req }: props) {
  const user = await currentUser();

  return (
    <>
      <Navbar />
      <Billboard />
      <AllList />
    </>
  );
}
