import { links } from "@/Pages/Router";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="min-h-[200px] bg-black text-amber-100  text-3xl px-4 mx-4 ">
      <div className="flex justify-between items-center pt-8">
        <div>logo place</div>
        <div className="flex gap-x-5">
          {links.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.name}
            </Link>
          ))}
        </div>
        {/* ///////////////////////////////////////////////////////////////////////////// */}
        <div>account place</div>
      </div>
    </div>
  );
};

export default Header;
