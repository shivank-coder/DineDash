import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCartItem, increaseQty, decreaseQty } from "../redux/productSlice";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
    const dispatch = useDispatch();
  return (
    <div className="bg-gray-100 p-3 flex gap-5 rounded-lg shadow-md border border-gray-300">
      <div className="p-3 bg-white rounded-lg overflow-hidden">
        <img src={image} className="h-28 w-40 object-cover rounded-md"/>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div 
            className="cursor-pointer text-gray-600 hover:text-red-500 transition-all"
            onClick={() => dispatch(deleteCartItem(id))}
          >
            <AiFillDelete />
          </div>
        </div>
        <p className="text-gray-500 font-medium">{category}</p>
        <p className="font-semibold text-lg text-gray-800">
          <span className="text-red-600">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => dispatch(increaseQty(id))}
              className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md transition-all"
            >
              <TbPlus />
            </button>
            <p className="font-semibold text-gray-700 p-2">{qty}</p>
            <button
              onClick={() => dispatch(decreaseQty(id))}
              className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md transition-all"
            >
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <p>Total:</p>
            <p><span className="text-red-600">₹</span>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
