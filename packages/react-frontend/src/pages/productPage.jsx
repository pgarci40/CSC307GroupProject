import { useEffect, useMemo, useState } from "react";
import './productPage.css'

export default function ProductScreen() {
  // Read SKU or name from the URL: /product?SKU=ABC123 or /product?name=Widget
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : "");
  const query = useMemo(() => ({
    SKU: params.get("SKU") || undefined,
    name: params.get("name") || undefined,
  }), [params.toString()]);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function run() {
      setLoading(true);
      setError("");
      try {
        const q = new URLSearchParams();
        if (query.SKU) q.set("SKU", query.SKU);
        if (query.name) q.set("name", query.name);
        const res = await fetch(`${import.meta.env.VITE_API_BASE || "http://localhost:8000"}/inventory?${q.toString()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // The backend may return: array of store docs with inventory[] or a flat list
        // Normalize into a single product object if possible.
        let found = null;
        if (Array.isArray(data)) {
          // Could be an array of stores, each with inventory[]
          for (const d of data) {
            if (Array.isArray(d?.inventory)) {
              for (const p of d.inventory) {
                if ((query.SKU && p.SKU === query.SKU) || (query.name && p.name === query.name)) {
                  found = p; break;
                }
              }
            } else if ((query.SKU && d.SKU === query.SKU) || (query.name && d.name === query.name)) {
              found = d; // flat product
            }
            if (found) break;
          }
          // If no filter, show the first product in the first inventory array
          if (!found) {
            const firstWithInv = data.find(d => Array.isArray(d?.inventory) && d.inventory.length > 0);
            found = firstWithInv ? firstWithInv.inventory[0] : null;
          }
        } else if (data && typeof data === 'object') {
          found = data;
        }

        if (active) setProduct(found);
      } catch (e) {
        if (active) setError(String(e));
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => { active = false };
  }, [query]);

  // Derived fields with safe fallbacks
  const name = product?.name || "Product Name";
  const sku = product?.SKU || product?.sku || "SKU";
  const qtyTotal = Number(product?.total_quantity ?? product?.qtyTotal ?? 0);
  const qtyFloor = Number(product?.quantity_on_floor ?? product?.qtyFloor ?? 0);
  const qtyBack = Number(product?.quantity_in_back ?? product?.qtyBack ?? 0);
  const price = product?.price;
  const description = product?.description || "No description provided.";
  const photo = product?.product_photo;

  async function handleOrder() {
    // Example: decrement back, increment floor — adjust to your business logic.
    // NOTE: Your backend currently exposes /inventory and service fns for quantity updates.
    // If you enable endpoints like PUT /inventory/floor and /inventory/back, wire them here.
    alert("Order button clicked. Hook this up to your POST/PUT endpoint when ready.");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="cube" aria-hidden>⬢</span>
          <span>Poly+ Inventory</span>
        </div>
        <div className="topbar-actions">
          <a className="btn btn-ghost" href="/">Back to Inventory</a>
          <button className="btn btn-outline">Logout</button>
        </div>
      </header>

      <main className="stage">
        <section className="panel">
          <div className="panel-grid">
            <div className="product-media">
              {photo ? (
                <img className="media-img" src={photo} alt={`${name} photo`} />
              ) : (
                <div className="media-box" role="img" aria-label="Product picture placeholder">
                  Product Picture
                </div>
              )}
            </div>

            <aside className="details card" aria-busy={loading} aria-live="polite">
              {loading ? (
                <div className="skeleton">Loading product…</div>
              ) : error ? (
                <div className="error">{error}</div>
              ) : (
                <>
                  <dl className="kv">
                    <div className="row"><dt>Product Name:</dt><dd>{name}</dd></div>
                    <div className="row"><dt>SKU:</dt><dd>{sku}</dd></div>
                    <div className="row"><dt>Quantity Total:</dt><dd>{qtyTotal}</dd></div>
                    <div className="row"><dt>Quantity on Floor:</dt><dd>{qtyFloor}</dd></div>
                    <div className="row"><dt>Quantity in Back:</dt><dd>{qtyBack}</dd></div>
                    {price != null && (
                      <div className="row"><dt>Price:</dt><dd>${'{'}price{'}'}</dd></div>
                    )}
                  </dl>
                  <div className="actions">
                    <button onClick={handleOrder} className="btn btn-primary">Order</button>
                  </div>
                </>
              )}
            </aside>
          </div>

          <section className="description card">
            <h2>Product Description:</h2>
            <div className="desc-scroll" role="region" aria-label="Product description">
              {loading ? " " : description}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
