"use client";
import { NextApiRequest } from "next";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import AllList from "@/components/AllList";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

type props = {
  req: NextApiRequest;
};

export default function Home({ req }: props) {
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <AllList />
    </>
  );
}
