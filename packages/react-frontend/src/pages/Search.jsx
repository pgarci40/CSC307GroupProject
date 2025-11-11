import "./Search.css";
import addProductIcon from "../assets/add-product-button.svg";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import React, { useState } from "react";


function Search({productsData}){
    const [term, setTerm] = useState("");

//   const results = useMemo(() => {
//     const t = term.trim().toLowerCase();
//     if (!t) return MOCK_PRODUCTS;
//     return MOCK_PRODUCTS.filter(p =>
//       p.name.toLowerCase().includes(t) || p.SKU.toLowerCase().includes(t)
//     );
//   }, [term]);

  return (
    <section className="hero">
      <div className="search-line">
        <div className="search-bar-container">
          {/* <SearchBar onSearch={setTerm} /> */}
        </div>
        <div className="add-product">
          <img src={addProductIcon} alt="Add Product Button" />
        </div>
      </div>

      <div className="filter-bar">


      </div>

      <div className="results-wrap">
        <div className="results-grid">
          {productsData.map((p) => (
            <ProductCard key={p.SKU} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Search