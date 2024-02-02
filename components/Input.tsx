"use client";

import { ChangeEventHandler } from "react";

type InputProps = {
  id: string;
  onChange: (e: any) => void;
  value: string;
  label: string;
  type?: string;
};

const Input = ({ id, onChange, value, label, type }: InputProps) => {
  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        className="
       block 
       rounded-md
       px-6 
       pt-6 
       pb-1
       w-full 
       text-base
       text-white
       bg-neutral-700
       appearance-none
       focus:outline-none
       focus:ring-0
       peer
  "
        placeholder=" "
      />
      <label
        className="
      absolute
      text-base
      text-zinc-400 
      transition-all
      duration-150
      -translate-y-3
      scale-75
      top-4
      z-10
      origin-[0]
      left-6
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-3
      "
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
