import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Link komponentini import ediyoruz
import '../styles/ProductList.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]); // Başlangıçta boş bir dizi veriyoruz
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // JSON dosyasından veri çekme
  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products || []); // Veri setini "products" olarak güncelledik, boş dizi olarak fallback yapıyoruz
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hata Detayı:", err);
        setError("Veri yüklenirken bir hata oluştu!");
        setLoading(false);
      });
  }, []);

  // Arama terimiyle ürün adı (name) karşılaştırmasını yapıyoruz
  const filteredProducts =
    searchTerm.length >= 2
      ? products.filter(
          (products) =>
            products.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase().trim()) // Boşlukları temizledik
        )
      : [];

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="products-list-container">
      <div className="products-search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Ürün Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Arama kutusuna yazılan yazıyı günceller
        />
      </div>

      {/* Eğer arama terimi varsa ve filtrelenmiş ürünler varsa, listeyi göster */}
      {searchTerm.length >= 2 && (
        <div className="search-results-overlay">
          <ul className="search-results">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <li key={product.id} className="search-result-item">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <Link
                      to={`/product/${product.sell}`}
                      className="product-link"
                    >
                      <h3 className="product-title">{product.name}</h3>
                    </Link>
                    <span className="product-price">{product.price} TL</span>
                  </div>
                </li>
              ))
            ) : (
              <li className="no-results">
                Aradığınız kriterlere uygun ürün bulunamadı.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
