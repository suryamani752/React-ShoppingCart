import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import SingleProduct from "../../components/singleProduct";
import SpinnerLoader from "../../components/loader";
import { useNavigate } from "react-router-dom";

const ProductLists = () => {
  const { loading, listOfProducts, lengthOfCartItems } =
    useContext(ShoppingCartContext);
  const navigate = useNavigate();
  //   console.log(loading,listOfProducts,error)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SpinnerLoader />
      </div>
    );
  }
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div
          className="sticky top-5 right-0 cursor-pointer z-10"
          onClick={() => navigate("/cart")}
        >
          <div className="relative">
            <div className="absolute top-0 right-0">
              <div className="right-3 w-[20px] h-[20px] bg-slate-200 rounded-full text-center text-orange-600 font-bold">
                {lengthOfCartItems}
              </div>
              <div className="absolute top-3 right-3">
                <i className="ri-shopping-cart-line text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-3xl font-extralight text-gray-950 sm:text-4xl">
            Our Featured Products
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-3 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {listOfProducts && listOfProducts.length > 0 ? (
            listOfProducts.map((singleProduct) => (
              <SingleProduct
                singleProduct={singleProduct}
                key={singleProduct?.id}
              />
            ))
          ) : (
            <h3>No Product Found</h3>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductLists;
