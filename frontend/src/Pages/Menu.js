import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../Component/AllProduct";
import { addCartItem } from "../redux/productSlice";

const Menu = () => {
  const { filterby } = useParams(); // Retrieves the dynamic param from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);

  // Find the product based on the filterby param
  const productDisplay = productData.find((el) => el._id === filterby);

  // If productDisplay is undefined, show loading or error message
  if (!productDisplay) {
    return <div>Product not found</div>;
  }

  const handleAddCartProduct = () => {
    dispatch(addCartItem(productDisplay));
  };

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay));
    navigate("/cart");
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        <div className="max-w-sm overflow-hidden w-full p-5">
          {/* Ensure image is available before rendering */}
          <img
            src={productDisplay.image || "default-image.jpg"}  // Fallback image if the product image is missing
            alt={productDisplay.name}
            className="hover:scale-105 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className="text-slate-500 font-medium text-2xl">{productDisplay.category}</p>
          <p className="font-bold md:text-2xl">
            <span className="text-red-500">₹</span>
            <span>{productDisplay.price}</span>
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleBuy}
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
            >
              Buy
            </button>
            <button
              onClick={handleAddCartProduct}
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
            >
              Add Cart
            </button>
          </div>
          <div>
            <p className="text-slate-600 font-medium">Description :</p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>

      <AllProduct heading={"Related Products"} />
    </div>
  );
};

export default Menu;
