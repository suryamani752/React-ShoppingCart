import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

const ProductDetail = () => {
  const { id } = useParams();
  const {
    productDetail,
    setProductDetail,
    cartItems,
    loading,
    setLoading,
    error,
    setError,
    handleAddToCart,
  } = useContext(ShoppingCartContext);
  //   console.log(id);

  async function fetchProductDetails() {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const productDetail = await response.json();
      //   console.log(productDetail);
      setProductDetail(productDetail);
      setError(null);
    } catch (error) {
      setError("unable to fetch the product details");
      //   console.log("unable to fetch the product details");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [id]);
  //   console.log(productDetail);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Please wait....we fetching the product details</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-xl shadow-lg relative">
              <img src={productDetail?.thumbnail} alt={productDetail?.title} />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
              {productDetail?.images?.length
                ? productDetail?.images.map((singleImageItem) => (
                    <div
                      className="rounded-xl p-4 shadow-md"
                      key={singleImageItem}
                    >
                      <img
                        src={singleImageItem}
                        alt="product secondry image"
                        className="w-24 cursor-pointer"
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-[#333333">
              {productDetail?.title}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-xl font-bold">${productDetail?.price}</p>
            </div>
            <div>
              <button
                onClick={() => handleAddToCart(productDetail)}
                className="mt-5 min-w-[200px] px-4 py-3 border border-[#333] bg-transparent text-sm font-semibold rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
