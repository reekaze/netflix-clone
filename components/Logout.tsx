"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import React from "react";

type Props = {};

const Logout = (props: Props) => {
  return (
    <button onClick={() => signOut()} className="h-10 w-full bg-white">
      Logout!
    </button>
  );
};

export default Logout;
