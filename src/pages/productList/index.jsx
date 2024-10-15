import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import SingleProduct from "../../components/singleProduct";

const ProductLists = () => {
  const { loading, listOfProducts, error } = useContext(ShoppingCartContext);
//   console.log(loading,listOfProducts,error)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h3>Fetching the Products....please wait</h3>
      </div>
    );
  }
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-3xl font-extralight text-gray-950 sm:text-4xl">
            Our Featured Products
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {listOfProducts && listOfProducts.length > 0 ? (
            listOfProducts.map((singleProduct) => (
              <SingleProduct singleProduct={singleProduct} key={singleProduct?.id} />
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
