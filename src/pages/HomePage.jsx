import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PartnerSlider from "../components/PartnerSlider";
import Contact from "../components/Contact";
import TopContent from "../components/TopContent";
import AccordionC from "../components/AccordionC";
import Services from "../components/Services";
import DryCleaningMobile from "../components/DryCleaningMobile";

const HomePage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <TopContent />
      <Categories />
      {windowWidth < 775 ? <DryCleaningMobile /> : <Services />}
      <AccordionC />
      <Contact />
      <PartnerSlider />
    </>
  );
};

export default HomePage;
