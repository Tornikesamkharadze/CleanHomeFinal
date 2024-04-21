import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/DryCleaningMobile.scss";
import { listingPhotoPaths } from "../data";
import { ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";

const DryCleaningMobile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current); // Clear existing interval
    intervalRef.current = setInterval(goToNextSlide, 3000);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
    startAutoSlide(); // Restart auto-slide after manual slide change
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
    startAutoSlide(); // Restart auto-slide after manual slide change
  };

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
    clearInterval(intervalRef.current); // Clear auto-slide interval on touch start
  };

  const handleTouchMove = (e) => {
    if (!startX) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
      startX = null;
    }
  };

  let startX = null;
  const threshold = 100;

  return (
    <div className="listing-card">
      <div
        className="slider-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths.map((service, index) => (
            <div key={service.id} className="slides">
              <img src={service.img} alt={`photo ${index + 1}`} />
              <h3 className="service" style={{ paddingTop: "20px" }}>
                {service.price}
              </h3>
              <p>{service.description}</p>
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link className="crft_btn" to={`/category/craftsman/order`}>
        ხელოსნის გამოძახება
      </Link>
    </div>
  );
};

export default DryCleaningMobile;
