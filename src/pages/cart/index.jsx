import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { useNavigate } from "react-router-dom";
import SingleCartItem from "../../components/cartTile";

const Cart = () => {
  const { cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  console.log(cartItems);
  return (
    <div className="max-w-5xl mx-auto mx-md:max-w-xl py-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        My Cart Page
      </h1>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2 space-y-4">
            {cartItems && cartItems?.length > 0 ? (
                cartItems.map((singleCartItem) => <SingleCartItem singleCartItem={singleCartItem} key={singleCartItem?.id} />)
            ) : (<h3>No items available in Cart! please add some items</h3>)}
        </div>
      </div>
    </div>
  );
};

export default Cart;
