import React, { useState } from "react";
import MainCard from "../components/main_categories";
import ProductsList from "../components/ProductsList";

export default function HomePage() {
  const [category, setCategory] = useState("Tüm Ürünlerimiz");
  return (
    <>
      <div className="container">
        <ProductsList />
        <h2 className="my-4r custom-color text-center border-bottom pb-2">{category && category}</h2>
        <div className="d-flex flex-wrap justify-content-center justify-content-md-between gap-3 gap-md-4 my-5">
          <MainCard />
        </div>
      </div>
    </>
  );
}
