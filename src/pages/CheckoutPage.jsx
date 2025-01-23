import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [basket, setBasket] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);
  }, []);

  const deleteProductFromBasket = (productId) => {
    const updatedBasket = basket.filter((product) => product.id !== productId);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    setBasket(updatedBasket);
    console.log("Ürün sepetten silindi.");
  };

  const deleteBasket = () => {
    localStorage.removeItem("basket");
    setBasket([]);
    console.log("Sepet temizlendi.");
  };

  const confirmBasket = () => {
    console.log("Sepet onaylandı.");
    navigate('/checkout-complete'); 
  };

  // Toplam tutarı hesapla
  const toplam = basket.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="container my-5" style={{ maxWidth: '900px', margin: 'auto' }}>
      <div className="d-flex flex-column gap-5">
        <Link to="/">
          <span className="mx-3 text-warning fw-bold fs-5 d-flex justify-content-center" style={{ fontSize: '1.1rem', textDecoration: 'underline' }}>
            Sepetinize Ürün Eklemek İster Misiniz?
          </span>
        </Link>
        <h2 className="text-center" style={{ fontSize: '2rem', fontWeight: '700', color: '#333' }}>Sepetim</h2>
        {basket.length === 0 ? (
          <p className="text-muted text-center" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#555', marginTop: '20px' }}>
            Sepetiniz şu anda boş. <span role="img" aria-label="sad">😞</span> Yeni ürünler eklemek için alışverişe başlayın!
          </p>        
        ) : (
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {basket.map((product) => (
              <div
                key={product.id}
                className="card py-2 shadow-sm"
                style={{ width: "280px", borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: 'transform 0.2s ease' }}
              >
                <div className="d-flex justify-content-center">
                  <img
                    className="object-fit-contain"
                    height={120}
                    src={product.image}
                    alt={product.name}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="card-body d-flex flex-column gap-1">
                  <h4 className="titleprice" style={{ fontWeight: '600', color: '#333' }}>{product.name}</h4>
                  <p className="textprice" style={{ fontSize: '1rem', color: '#888' }}>{product.price} TL</p>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => deleteProductFromBasket(product.id)}
                    style={{ borderRadius: '5px', padding: '10px 20px', fontSize: '1rem' }}
                  >
                    Sepetten Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <h3 className="text-center" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#333', marginTop: '20px' }}>
          Toplam Tutar: <span style={{ color: '#ff6347' }}>{toplam} TL</span>
        </h3>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn btn-success custom-width" onClick={confirmBasket} style={{ borderRadius: '5px', padding: '12px 25px', fontSize: '1.1rem' }}>
            Sepeti Onayla
          </button>
          <button className="btn btn-danger custom-width" onClick={deleteBasket} style={{ borderRadius: '5px', padding: '12px 25px', fontSize: '1.1rem' }}>
            Sepeti Temizle
          </button>
        </div>
      </div>
    </div>
  );
}
