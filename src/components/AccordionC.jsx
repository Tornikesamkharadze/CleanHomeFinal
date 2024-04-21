import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { AccordionData } from "../data";
import "../styles/Accordion.scss";

const AccordionC = () => {
  const [openItem, setOpenItem] = useState(null); // State to keep track of open item

  const toggleAccordion = (itemId) => {
    setOpenItem((prevOpenItem) => (prevOpenItem === itemId ? null : itemId));
  };

  return (
    <>
      <Accordion allowZeroExpanded className="Accordion">
        {AccordionData.map((item) => (
          <AccordionItem
            key={item.id}
            className="Accordion__item"
            uuid={item.id}
          >
            <AccordionItemHeading className="Accordion__item__heading">
              <AccordionItemButton
                onClick={() => toggleAccordion(item.id)}
                className={`Accordion__item__button ${
                  openItem === item.id ? "is-open" : ""
                }`}
              >
                {item.heading}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="Accordion__item__panel">
              {item.content}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default AccordionC;
