import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//create context
export const ShoppingCartContext = createContext(null);

//provide state to context

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [error, setError] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [lengthOfCartItems, setLengthOfCartItems] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // console.log(pathname);

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
    // const storedCartItems = localStorage.getItem("cartItems");
    // setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
    setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
  }, []);
  useEffect(() => {
    let lengthOfCartItemsProduct = cartItems?.length;
    // console.log(lengthOfCartItemsProduct)
    setLengthOfCartItems(lengthOfCartItemsProduct);
  }, [cartItems]);
  //   console.log(listOfProducts)

  //   function handleAddToCart(getProductDetail) {
  //     // console.log(getProductDetail);
  //     let copyExistingProducts = [...cartItems];
  //     const findIndexOfCurrentItem = copyExistingProducts.findIndex(
  //       (cartItem) => cartItem.id === getProductDetail.id
  //     );
  //     // console.log(findIndexOfCurrentItem);
  //     if (findIndexOfCurrentItem === -1) {
  //       copyExistingProducts.push({
  //         ...getProductDetail,
  //         quantity: 1,
  //         totalPrice: productDetail?.price,
  //       });
  //     } else {
  //       //   console.log("comming here");
  //       copyExistingProducts[findIndexOfCurrentItem] = {
  //         ...copyExistingProducts[findIndexOfCurrentItem],
  //         quantity: copyExistingProducts[findIndexOfCurrentItem].quantity + 1,
  //         totalPrice:
  //           (copyExistingProducts[findIndexOfCurrentItem].quantity + 1) *
  //           copyExistingProducts[findIndexOfCurrentItem].price,
  //       };
  //     }
  //     // console.log(copyExistingProducts, "copyExistingProducts");
  //     localStorage.setItem("cartItems", JSON.stringify(copyExistingProducts));
  //     setCartItems(copyExistingProducts);
  //     // console.log(cartItems);
  //     navigate("/cart");
  //   }

  function handleAddToCart(getProductDetail) {
    let copyExistingProducts = [...cartItems];
    const findIndexOfCurrentItem = copyExistingProducts.findIndex(
      (cartItem) => cartItem.id === getProductDetail.id
    );

    if (findIndexOfCurrentItem === -1) {
      copyExistingProducts.push({
        ...getProductDetail,
        quantity: 1,
        totalPrice: getProductDetail.price,
      });
    } else {
      const currentItem = copyExistingProducts[findIndexOfCurrentItem];
      const newQuantity = currentItem.quantity + 1;
      copyExistingProducts[findIndexOfCurrentItem] = {
        ...currentItem,
        quantity: newQuantity,
        totalPrice: newQuantity * currentItem.price,
      };
    }

    localStorage.setItem("cartItems", JSON.stringify(copyExistingProducts));
    setCartItems(copyExistingProducts);
    if (pathname !== "/") {
      navigate("/cart");
    }
  }

  //   function handleRemoveFromCart(getProductDetail, isFullyRemoveFromCart) {
  //     let copyExistingProducts = [...cartItems];
  //     const findIndexOfCurrentItem = copyExistingProducts.findIndex(
  //       (item) => item.id === getProductDetail.id
  //     );
  //     // console.log(findIndexOfCurrentItem);
  //     if (isFullyRemoveFromCart) {
  //       copyExistingProducts.splice(findIndexOfCurrentItem, 1);
  //     } else {
  //       copyExistingProducts[findIndexOfCurrentItem] = {
  //         ...copyExistingProducts[findIndexOfCurrentItem],
  //         quantity: copyExistingProducts[findIndexOfCurrentItem].quantity - 1,
  //         totalPrice:
  //           (copyExistingProducts[findIndexOfCurrentItem].quantity) *
  //           copyExistingProducts[findIndexOfCurrentItem].price,
  //       };
  //     }
  //     localStorage.setItem("cartItems", JSON.stringify(copyExistingProducts));
  //     setCartItems(copyExistingProducts);
  //   }
  function handleRemoveFromCart(getProductDetail, isFullyRemoveFromCart) {
    let copyExistingProducts = [...cartItems];
    const findIndexOfCurrentItem = copyExistingProducts.findIndex(
      (item) => item.id === getProductDetail.id
    );

    if (findIndexOfCurrentItem !== -1) {
      if (isFullyRemoveFromCart) {
        copyExistingProducts.splice(findIndexOfCurrentItem, 1);
      } else {
        const currentItem = copyExistingProducts[findIndexOfCurrentItem];

        const newQuantity = currentItem.quantity - 1;

        if (newQuantity === 0) {
          copyExistingProducts.splice(findIndexOfCurrentItem, 1);
        } else {
          copyExistingProducts[findIndexOfCurrentItem] = {
            ...currentItem,
            quantity: newQuantity,
            totalPrice: newQuantity * currentItem.price,
          };
        }
      }
    }

    localStorage.setItem("cartItems", JSON.stringify(copyExistingProducts));
    setCartItems(copyExistingProducts);
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
        handleRemoveFromCart,
        lengthOfCartItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
