import React from "react";
import Categories from "../components/Categories";
import PartnerSlider from "../components/PartnerSlider";
import Contact from "../components/Contact";
import TopContent from "../components/TopContent";
import ThreeColumnCard from "../components/ThreeColumnCard";
import AccordionC from "../components/AccordionC";

const HomePage = () => {
  return (
    <>
      <TopContent />
      <Categories />
      {/*   <ThreeColumnCard /> */}
  
      <AccordionC />
      <Contact />
      <PartnerSlider />
    </>
  );
};

export default HomePage;
