import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

const SingleProduct = ({ singleProduct }) => {
  const{cartItems,handleAddToCart} = useContext(ShoppingCartContext)
  // console.log(singleProduct)
  const navigate = useNavigate();

  function handleNavigateToProductDetailsPage(getCurrrentProductId) {
    // console.log(getCurrrentProductId);
    navigate(`/product-detail/${getCurrrentProductId}`);
  }

  return (
    <div className="relative group border border-cyan-700 p-6 cursor-pointer">
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img
          src={singleProduct?.thumbnail}
          alt={singleProduct?.title}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
        />
      </div>
      <div className="flex items-start justify-between mt-4 space-x-4">
        <div className="font-bold text-gray-900 sm:text-sm text-xs md:text-base">
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
            {singleProduct?.title}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]">
            ${singleProduct?.price}
          </p>
        </div>
      </div>
      <button
        onClick={() => handleNavigateToProductDetailsPage(singleProduct?.id)}
        className="px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg"
      >
        View Details
      </button>
      {singleProduct &&
      cartItems.findIndex((item) => item.id === singleProduct.id) > -1 ? (
        <>
          
          <button
            onClick={() => navigate("/cart")}
            className="px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg"

          >
            Go to Cart
          </button>
          <p className="mt-1 text-green-600">
            This Product is already added to cart!
          </p>
        </>
      ) : (
        <button
          onClick={() => handleAddToCart(singleProduct)}
          className="px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg"

        >
          Add to cart
        </button>
      )}
    </div>
  );
};

export default SingleProduct;
