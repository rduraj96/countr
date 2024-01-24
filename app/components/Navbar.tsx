import React from "react";
import { ModeToggle } from "./togglleButton";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="p-12 pb-0 w-full flex justify-between items-center">
      {/* <Image src={"/logo.svg"} alt="logo" height={60} width={60} /> */}
      <div className="flex cursor-pointer">
        <span className="text-primary text-5xl font-extrabold hover:animate-spin">
          +
        </span>
        <span className="text-6xl font-black text-black dark:text-white">
          R
        </span>
      </div>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
