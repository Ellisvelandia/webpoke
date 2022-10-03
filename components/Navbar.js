import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-14 p-2 flex items-center justify-center bg-poke-red shadow-[0_4px_50px_#EF5350]">
      <Link href="/">
        <a>
          <img src="/logo.webp" alt="logo" height={36} width={124} />
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
