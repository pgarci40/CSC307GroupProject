import React, {useState, useEffect} from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import NavbarSearch from "./components/Navbar_search";
import Search from "./pages/Search";

function App() {
  
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8000/inventory/products")
      .then((res) => res.json())
      .then((data) => {
        const cardData = (data || []).map((p) => ({
          name: p.name ?? "",
          imageURL: p.imageURL ?? p.product_photo ?? "",
          SKU: p.SKU ?? p.sku ?? "",
          price: Number(p.price ?? 0),
          quantity: Number(p.quantity ?? p.total_quantity ?? 0),
        }));
        setProducts(cardData)

      })
      .then((error) => {console.log(error); });
  }, []);
  
  
  return (
    <div>
      <NavbarSearch />
      <Search 
        productsData={products}
      />

      {/* <Navbar />
      <Home /> */}
    </div>
  );
}

export default App;
