import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Card({ category }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Her sayfada gösterilecek ürün sayısı
  const [loading, setLoading] = useState(true); // Yükleniyor durumu
  const [error, setError] = useState(null); // Hata durumu
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => {
        if (!res.ok) throw new Error("Veri alınamadı");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hata:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => product.category === category);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToBasket = (product) => {
    const basket = JSON.parse(localStorage.getItem("basket")) || [];
    const updatedBasket = [...basket, product];
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    console.log("Ürün sepete eklendi:", product);
    navigate("/checkout");
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="bang">{category}</h2>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <div key={product.id} className="card py-2" style={{ width: "280px" }}>
              <div className="d-flex justify-content-center">
                <img
                  className="object-fit-contain"
                  height={120}
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="card-body d-flex flex-column gap-1 ">
                <h4 className="titleprice">{product.name}</h4>
                <p className="textprice">{product.price} TL</p>
                <Link to={`/product/${product.sell}`} className="btn btn-primary mt-auto">
                  Detayları Gör
                </Link>
                <button
                  className="btn btn-success mt-2"
                  onClick={() => handleAddToBasket(product)}
                >
                  Satın Al
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Bu kategoride ürün bulunamadı.</p>
        )}
      </div>

      {filteredProducts.length > itemsPerPage && (
        <div className="pagination d-flex justify-content-center gap-2 mt-3">
          {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
