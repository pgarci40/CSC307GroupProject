import "./Search.css";
import addProductIcon from "../assets/add-product-button.svg";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import { useMemo, useState } from "react";

const MOCK_PRODUCTS = [
  { name: "Green Water Bottle", imageUrl: "", SKU: "WB-001", price: 12.99, quantity: 87 },
  { name: "Poly Hoodie", imageUrl: "", SKU: "HD-220", price: 39.00, quantity: 12 },
  { name: "USB-C Cable", imageUrl: "", SKU: "CB-130", price: 7.50, quantity: 240 },
  { name: "Smart Phone", imageUrl: "", SKU: "SM-310", price: 1700.00, quantity: 5 },

  
  // …replace with real data later
];

export default function Search(){
  const [term, setTerm] = useState("");

  const results = useMemo(() => {
    const t = term.trim().toLowerCase();
    if (!t) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(t) || p.sku.toLowerCase().includes(t)
    );
  }, [term]);

  return (
    <section className="hero">
      <div className="search-line">
        <div className="search-bar-container">
          <SearchBar onSearch={setTerm} />
        </div>
        <div className="add-product">
          <img src={addProductIcon} alt="Add Product Button" />
        </div>
      </div>

      {/* optional: filters can go here */}
      <div className="filter-bar"></div>

      <div className="results-wrap">
        <div className="results-grid">
          {results.map((p) => (
            <ProductCard key={p.SKU} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
