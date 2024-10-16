import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context";

const SingleCartItem = ({ singleCartItem }) => {
  const { handleAddToCart, handleRemoveFromCart } =
    useContext(ShoppingCartContext);
  return (
    <>
      <div className="grid grid-cols-3 items-start gap-5">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm'">
            <img
              src={singleCartItem?.thumbnail}
              alt={singleCartItem?.title}
              className="w-ful h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {singleCartItem?.title}
            </h3>
            <button
              onClick={() => handleRemoveFromCart(singleCartItem, true)}
              className="text-sm px-4 py-3 bg-black text-white font-extrabold"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="ml-auto">
          <h3 className="text-lg font-bold text-gray-900">
            ${singleCartItem?.totalPrice.toFixed(2)}
          </h3>
          <p className="mt-2 mb-3 font-bold text-[16px]">
            Quantity: {singleCartItem?.quantity}
          </p>
          <div className="mt-3">
            <button
              onClick={() => handleRemoveFromCart(singleCartItem, false)}
              disabled={singleCartItem?.quantity === 1}
              className="disabled:opacity-65 border border-[#000] mr-1 bg-black text-white p-2 rounded-sm"
            >
              -
            </button>
            <button
              onClick={() => handleAddToCart(singleCartItem)}
              className="border border-[#000] bg-black text-white p-2 rounded-sm"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCartItem;
