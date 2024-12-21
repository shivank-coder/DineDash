import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div onClick={onClick} className="flex flex-col items-center">
      <div
        className={`text-3xl p-5 rounded-full cursor-pointer ${isActive ? "bg-indigo-600 text-white" : "bg-orange-400 hover:bg-orange-500"} transition-all duration-300`}
      >
        <CiForkAndKnife />
      </div>
      <p className="text-center font-medium my-2 text-gray-700 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
