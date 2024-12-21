import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = productData.length
    ? [...new Set(productData.map((el) => el.category).filter(Boolean))]
    : [];

  // Filter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filteredProducts = productData.filter(
      (el) => el.category?.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(filteredProducts);
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5">
      <h2 className="font-bold text-3xl text-gray-900 mb-6 text-center">{heading}</h2>

      <div className="flex gap-4 justify-center overflow-x-auto scrollbar-none mb-5">
        {categoryList.length ? (
          categoryList.map((category) => (
            <FilterProduct
              category={category}
              key={category}
              isActive={category.toLowerCase() === filterby.toLowerCase()}
              onClick={() => handleFilterProduct(category)}
            />
          ))
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p className="text-xl text-gray-600">Loading...</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-6 my-4">
        {dataFilter.length ? (
          dataFilter.map((el) => (
            <CardFeature
              key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              category={el.category}
              price={el.price}
            />
          ))
        ) : (
          loadingArrayFeature.map((_, index) => (
            <CardFeature loading="Loading..." key={`allProduct${index}`} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllProduct;
