import React from "react";
import Card from "../components/cards";
import ProductsList from "../components/ProductsList"; // import işlemi buraya eklendi

const AtistirmaPage = () => {
  return (
    <div className="container">
      <ProductsList />
      <h1 className="custom-color text-center border-bottom pb-2">Mutlu Yıllar</h1>
      <Card category={"Atıştırmalık"}/>
    </div>
  );
};

export default AtistirmaPage;
