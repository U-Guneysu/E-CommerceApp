import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainCard() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  function handleClick(href) {
    navigate(href);
  }

  //Verileri JSON'dan
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Veri alınamadı:", error));
  }, []);

  const saveCategoryToLocalStorage = (categories) => {
    localStorage.setItem("selectedCategory", categories);
    console.log(`Seçilen kategori: ${categories}`);
  };
  const addToBasket = (categories) => {};
  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center">
      {categories.map((categories) => (
        <div
          key={categories.id}
          className="card py-2"
          style={{ width: "250px" }}
        >
          <div className="d-flex justify-content-center">
            <img
              className="object-fit-contain"
              height={120}
              src={categories.image}
              alt={categories.name}
              onClick={() => {
                saveCategoryToLocalStorage(categories.goesto);
                handleClick(categories.goesto);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="card-body d-flex flex-column gap-1">
            <h4 className="d-flex flex-wrap gap-3 justify-content-center">
              {categories.name}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}
