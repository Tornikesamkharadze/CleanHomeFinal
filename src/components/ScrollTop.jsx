import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import { FaArrowAltCircleUp } from "react-icons/fa";

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsVisible(scrollTop > 300);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return (
    <>
      <Link
        to="top"
        smooth={true}
        duration={500}
        className={`scroll-to-top ${isVisible ? "active" : ""}`}
        onClick={scrollToTop}
      >
        <FaArrowAltCircleUp style={{ width: "34px",height:"34px" }} />
      </Link>
    </>
  );
};

export default ScrollTop;
