import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem, increaseQty } from "../redux/productSlice";

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch();

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem({
      _id: id,
      name: name,
      price: price,
      category: category,
      image: image
    }));
  };

  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-xl drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col rounded-lg transition-all">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full object-cover rounded-md"/>
            </div>
            <h3 className="font-semibold text-gray-800 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className="text-gray-600 font-medium">{category}</p>
            <p className="font-bold">
              <span className="text-red-600">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 py-2 mt-3 rounded-lg hover:scale-105 transition-transform duration-300 w-full shadow-lg hover:shadow-2xl text-white font-semibold"
            onClick={handleAddCartProduct}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
