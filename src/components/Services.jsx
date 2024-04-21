import React, { useState, useEffect } from "react";
import { listingPhotoPaths } from "../data";
import { Link } from "react-router-dom";
import styled from "styled-components";

const titles = [
  {
    id: 1,
    price: "რბილი ავეჯის ქიმწმენდა 50 ₾ - დან",
    description: "პროცედურას ამოჰყავს ღრმად ჩამჯდარი ჭუჭყი, სუნი და ლაქები",
  },
  {
    id: 2,
    price: "სანტექნიკის გამოძახება 60 ₾ - დან",
    description:
      "გაქვთ სანტექნიკის პრობლემები? ჩვენ გამოვასწორებთ ნებისმიერ პრობლემას!",
  },
  {
    id: 3,
    price: "სარეცხი და ჭურჭლის სარეცხი მანქანების შეკეთება 80 ₾ - დან",
    description:
      "ჩვენი გამოცდილი ხელოსნები სწრაფად შეარჩევენ საჭირო ნაწილებს და რეკორდულ დროში შეაკეთებენ თქვენს მანქანას.",
  },
];

const Services = () => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper className="service-wrapper">
      <TitleWrapper>
        <h1>{titles[titleIndex].price}</h1>
        <p>{titles[titleIndex].description}</p>
      </TitleWrapper>
      <div className="items">
        {listingPhotoPaths.map((item) => (
          <ServiceItem key={item.id}>
            <img src={item.img} alt={item.description} />
            <h1>{item.price}</h1>
            <p>{item.description}</p>
          </ServiceItem>
        ))}
      </div>
      <StyledLinkWrapper>
        <StyledLink to={`/category/craftsman/order`}>
          ხელოსნის გამოძახება
        </StyledLink>
      </StyledLinkWrapper>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  .items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ServiceItem = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
    opacity: 0.9;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  h1 {
    font-size: 18px;
    margin: 10px 0;
  }

  p {
    font-size: 14px;
    color: #666666;
  }
`;

const StyledLinkWrapper = styled.div`
  text-align: center;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: rgb(69, 142, 240);
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  margin: 20px 0px 40px 0px;
  &:hover {
    background-color: #0056b3;
  }
`;

export default Services;
