import React from "react";

import Image from "next/image";
import { currentUser } from "@/lib/currentUser";
import Link from "next/link";

type Props = {};

const ProfilesPage = async (props: Props) => {
  const user = await currentUser();

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <Link href={"/"}>
            <div className="group w-44 mx-auto">
              <div className="relative w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <Image fill src="/images/default-blue.png" alt="profile" />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {user.name}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
