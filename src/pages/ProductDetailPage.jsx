import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import ProductsList from "../components/ProductsList";

const ProductDetailPage = () => {
  const { id } = useParams(); // URL'deki :id parametresini al
  const [product, setProduct] = React.useState(null); // Seçili ürünü tutmak için state
  const navigate = useNavigate(); // Sepete yönlendirme için

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Sadece ilgili `sell` alanına sahip ürünü al
        const response = await fetch(
          `http://localhost:3000/products?sell=${id}`
        );
        if (!response.ok) {
          throw new Error("Ürün bulunamadı!");
        }

        const data = await response.json();
        if (data.length > 0) {
          setProduct(data[0]); // İlk öğeyi seç (API bir array döndürüyor)
        } else {
          setProduct(null); // Ürün bulunamadıysa
        }
      } catch (error) {
        console.error("Hata:", error.message);
      }
    };

    fetchProduct();
  }, [id]); // id değiştikçe tekrar çalışır

  const handleBuyNow = () => {
    if (!product) return;

    // LocalStorage'deki mevcut sepeti al
    const basket = JSON.parse(localStorage.getItem("basket")) || [];

    // Ürünü sepete ekle
    const updatedBasket = [...basket, product];

    // Güncellenmiş sepeti LocalStorage'e kaydet
    localStorage.setItem("basket", JSON.stringify(updatedBasket));

    console.log("Ürün sepete eklendi:", product);

    // Sepet sayfasına yönlendir
    navigate("/checkout");
  };

  if (!product) {
    return <p>Yükleniyor veya ürün bulunamadı...</p>; // Ürün yüklenirken veya bulunamazsa
  }

  return (
    <div className="search">
      <ProductsList />
      <div className="detailcontainer my-5 gap-5">
        <div className="row">
          <div className="col-md-6">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: product.name,
                  isFluidWidth: true,
                  src: product.image,
                },
                largeImage: {
                  src: product.image,
                  width: 1200,
                  height: 1800,
                },
              }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center gap-2">
            <h2 className="mb-4">{product.name}</h2>
            <p className="mb-1">{product.description}</p>
            <div className="productinfo d-flex flex-column">
              <h3 className="mb-3">{product.price} TL</h3>
              <button className="btn btn-success" onClick={handleBuyNow}>
                Satın Al
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
