import "./Search.css";
import addProductIcon from "../assets/add-product-button.svg";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import AddProductPopUp from "../components/AddProductPopUp";
import React, { useState } from "react";



function Search({productsData, onProductAdded}){
    const [term, setTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => !submitting && setOpen(false);

    const handleSubmit = async (payload) => {
      try {
        setSubmitting(true);
        // The end if the store id for target 
        const res = await fetch("http://localhost:8000/inventory/690aaa9be73854e0640a1927/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: payload.name?.trim(),
            SKU: payload.SKU?.trim(),
            quantity: Number(payload.quantity ?? 0),
            description: payload.description?.trim() ?? "",
            price: Number(payload.price ?? 0),
          }),
        });

        // Try to read a message from the server even on error
        let data;
        try { data = await res.json(); } catch { data = {}; }

        if (!res.ok) {
          const msg =
            data?.message ||
            data?.error ||
            `Request failed with status ${res.status}`;
          throw new Error(msg);
        }

        const saved = data;

        const cardData = {
          name: saved.name ?? payload.name ?? "",
          imageURL: saved.imageURL ?? saved.product_photo ?? "",
          SKU: saved.SKU ?? saved.sku ?? payload.SKU ?? "",
          price: Number(saved.price ?? 0),
          quantity: Number(saved.quantity ?? saved.total_quantity ?? payload.quantity ?? 0),
        };

        onProductAdded?.(cardData);
        setOpen(false);
      } catch (e) {
        console.error(e);
        alert(`Failed to save product: ${e.message}`);
      } finally {
        setSubmitting(false);
      }
    };

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
          <SearchBar onSearch={setTerm} />
        </div>

        {/* Add Product trigger */}
        <button
          className="add-product"
          onClick={handleOpen}
          aria-label="Add Product"
          title="Add Product"
          style={{ border: "none"}}
        >
          <img src={addProductIcon} alt="" />
        </button>
      </div>

      <div className="results-wrap">
        <div className="results-grid">
          {productsData.map((p) => (
            <ProductCard key={p.SKU} {...p} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AddProductPopUp
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      />
    </section>
  );
}

export default Search