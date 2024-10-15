import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductLists from "./pages/productList";
import ProductDetail from "./pages/productDetail";
import Cart from "./pages/cart";

function App() {
  return (
    <>
      {/* <h1 className="text-center">suryamani</h1> */}
      <Routes>
        <Route path="/" element={<ProductLists />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
