import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { useNavigate } from "react-router-dom";
import SingleCartItem from "../../components/cartTile";

const Cart = () => {
  const { cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  //   console.log(cartItems);
  return (
    <div className="max-w-5xl mx-auto mx-md:max-w-xl py-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        My Cart Page
      </h1>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2 space-y-4">
          {cartItems && cartItems?.length > 0 ? (
            cartItems.map((singleCartItem) => (
              <SingleCartItem
                singleCartItem={singleCartItem}
                key={singleCartItem?.id}
              />
            ))
          ) : (
            <h3>No items available in Cart! please add some items</h3>
          )}
        </div>
        <div className="bg-gray-100 rounded-sm p-4 h-max">
          <h3 className="text-xl font-extrabold text-gray-950 border-b broder-gray-300 pb-2">
            {" "}
            Order Summary
          </h3>
          <ul className="text-gray-700 mt-4 space-y-2">
            <p className="flex flex-wrap gap-4 text-sm font-bold">
              Total{" "}
              <span>
                $
                {cartItems
                  .reduce((acc, curr) => acc + curr.totalPrice, 0)
                  .toFixed(2)}
              </span>
            </p>
          </ul>
          <div className="mt-5 flex gap-2">
            <button
              disabled={cartItems.length === 0}
              className="disabled:opacity-65 text-sm px-4 py-3 bg-black text-white font-extrabold"
            >
              Checkout
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-sm px-4 py-3 bg-black text-white font-extrabold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
