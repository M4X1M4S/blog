import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./GetStarted";
const Header = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="flex justify-between items-center border-b-1 border-gray-200 shadow-2xs pt-2">
      <div className="font-[gt-super] text-2xl  font-bold tracking-tight ml-6">
        Typetide
      </div>
      <div>
        <input
          className=" rounded-3xl border-1 border-gray-300 px-4 py-1 w-96 mb-2"
          type="text"
          placeholder="Search"
        ></input>
      </div>
      <div className="flex ">
        <div className="mr-6">
          <button className="">write</button>
        </div>
        <div className="mr-6">
          <button onClick={{}}>
            <img className="rounded-full" src="" alt="avatar" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
