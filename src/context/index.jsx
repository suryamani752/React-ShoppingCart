import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//create context
export const ShoppingCartContext = createContext(null);

//provide state to context

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [error, setError] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  async function fetchListOfProducts() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const result = await response.json();
      //   console.log(result.products);
      setListOfProducts(result?.products);
      setError(null);
    } catch (error) {
      setError("Unable to fetch products");
      //   console.log("unable to fetch products");
    } finally {
      setLoading(false);
      setError(null);
    }
  }

  useEffect(() => {
    fetchListOfProducts();
    setCartItems(JSON.parse(localStorage.getItem("cartItems") || []));
  }, []);
  //   console.log(listOfProducts)

  function handleAddToCart(getProductDetail) {
    console.log(getProductDetail);
    let copyExistingProducts = [...cartItems];
    const findIndexOfCurrentItem = copyExistingProducts.findIndex(
      (cartItem) => cartItem.id === getProductDetail.id
    );
    console.log(findIndexOfCurrentItem);
    if (findIndexOfCurrentItem === -1) {
      copyExistingProducts.push({
        ...getProductDetail,
        quantity: 1,
        totalPrice: productDetail?.price,
      });
    } else {
      console.log("comming here");
      copyExistingProducts[findIndexOfCurrentItem] = {
        ...copyExistingProducts[findIndexOfCurrentItem],
        quantity: copyExistingProducts[findIndexOfCurrentItem].quantity + 1,
        totalPrice:
          (copyExistingProducts[findIndexOfCurrentItem].quantity + 1) *
          copyExistingProducts[findIndexOfCurrentItem].price,
      };
    }
    console.log(copyExistingProducts, "copyExistingProducts");
    localStorage.setItem("cartItems", JSON.stringify(copyExistingProducts));
    setCartItems(copyExistingProducts);
    // console.log(cartItems);
    navigate("/cart");
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        loading,
        setLoading,
        listOfProducts,
        setListOfProducts,
        error,
        setError,
        productDetail,
        setProductDetail,
        cartItems,
        setCartItems,
        handleAddToCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
