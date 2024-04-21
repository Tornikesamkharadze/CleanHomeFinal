import React, { useState } from "react";
import { listingPhotoPaths } from "../data"; // Importing data
import "../styles/ThreeColumnCard.scss"; // Import SCSS file
import { Link } from "react-router-dom";
const ThreeColumnCard = () => {
  const [selectedItem, setSelectedItem] = useState(listingPhotoPaths[0]);

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="card-container">
      {listingPhotoPaths.map((item) => (
        <div
          key={item.id}
          className={`card ${selectedItem === item ? "selected" : ""}`}
          onClick={() => handleClick(item)}
        >
          <div className="text-container">
            <h3 style={{ color: "#24355A" }}>{item.price}</h3>
            <p>{item.description}</p>
          </div>
          <div className="image-container">
            <img src={item.img} alt={item.price} />
          </div>
        </div>
      ))}
      <Link className="order" to={`/category/craftsman/order`}>
        ხელოსნის გამოძახება
      </Link>
    </div>
  );
};

export default ThreeColumnCard;
