import React from "react";
import Categories from "../components/Categories";
import PartnerSlider from "../components/PartnerSlider";
import Contact from "../components/Contact";
import TopContent from "../components/TopContent";
import AccordionC from "../components/AccordionC";
import Services from "../components/Services";
const HomePage = () => {
  return (
    <>
      <TopContent />
      <Categories />
      <Services />
      <AccordionC />
      <Contact />
      <PartnerSlider />
    </>
  );
};

export default HomePage;
