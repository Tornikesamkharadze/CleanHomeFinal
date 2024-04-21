import React, { useEffect } from "react";
import "../styles/Categories.scss";
import { Link } from "react-router-dom";
import { FaKitchenSet } from "react-icons/fa6";
import { FcHome } from "react-icons/fc";
import { FaBath } from "react-icons/fa6";
const informationCards = [
  {
    id: 1,
    title: "მთლიანი სახლის დალაგება",
    description:
      "იატაკის სველი წესით წმენდა,მტვრის ყველა ზედაპირიდან მოშორება,სარკეების წმენდა, ყველა ნივთს მივუჩენთ თავის ადგილს, საძინებელში თეთრეულს შევცლით",
    icon: <FcHome />,
  },
  {
    id: 2,
    title: "სამზარეულოში",
    description:
      "ჩვენ გავრეცხავთ ჭურჭელს და ნიჟარას, გავასუფთავებთ ყველა ზედაპირს, მათ შორის ღუმელს და მაგიდას, ცხიმისა და საკვების ნარჩენებისგან",
    icon: <FaKitchenSet />,
  },
  {
    id: 3,
    title: "სააბაზანოში",
    description:
      "გავრეცხავთ ნიჟარას, შხაპს, ტუალეტს, გავასუფთავებთ სარკეებს და მოვაცილებთ მტვერს ყველა ზედაპირიდან",
    icon: <FaBath />,
  },
  {
    id: 4,
    title: "მთლიანი სახლის დალაგება",
    description:
      "იატაკისა და პლინტუსების სველი წესით წმენდა, ხალიჩების მტვერსასრუტით წმენდა. მტვრის ყველა ზედაპირიდან მოშორება; სარკეების გაწმენდა მთელ სახლში. ყველა ნივთს მივუჩენთ თავის ადგილს, საძინებელში თეთრეულს შევცლით. გამოვიტანთ",
    icon: <FcHome />,
  },
  {
    id: 5,
    title: "სამზარეულოში",
    description:
      "ჩვენ გავრეცხავთ ჭურჭელს და გავასუფთავებთ ყველა ზედაპირს ცხიმისა და საკვების ნარჩენებისგან, მათ შორის ნიჟარას, ღუმელს, გაზქურას, მიკროტალღურ ღუმელს, მაცივარს. მოვაწესრიგებთ და გავწმენდთ სამზარეულოს კარადებს",
    icon: <FaKitchenSet />,
  },
  {
    id: 6,
    title: "სააბაზანოში",
    description:
      "გავრეცხავთ ნიჟარას, შხაპს, ტუალეტს, გავასუფთავებთ სარკეებს და მოვაცილებთ მტვერს ყველა ზედაპირიდან",
    icon: <FaBath />,
  },
];

function Categories() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);

  return (
    <>
      {/* GENERAL CLEAN */}
      <div className="info-section" id="services">
        <div className="info-title-content">
          <h3 className="info-title">
            <span>რას გთავაზობთ</span>
          </h3>
          <h1>სტანდარტული დასუფთავება 80 ლარიდან</h1>
          <p className="info-description">
            საუკეთესო გზა თქვენი ბინის სისუფთავის <br />
            შესანარჩუნებლად
          </p>
        </div>

        <div className="info-cards-content">
          {informationCards.slice(0, 3).map((card, index) => (
            <div className="info-cards" key={index}>
              <span className="info-card-icon">
                <span className="info-fa-icon">{card.icon}</span>
              </span>
              <p className="info-card-title">{card.title}</p>
              <p className="info-card-description">{card.description}</p>
            </div>
          ))}
        </div>
        <Link className="details" to={`/category/standart/order`}>
          შეუკვეთე
        </Link>
      </div>
      {/* STANDART CLEAN */}
      <div className="info-section" id="services">
        <div className="info-title-content">
          <h1>გენერალური დასუფთავება 150 ლარიდან</h1>
          <p className="info-description">
            იდეალური გადაწყვეტილება მათთვის ვინც ახალ <br />
            ბინაში გადადის საცხოვრებლად
          </p>
        </div>

        <div className="info-cards-content">
          {informationCards.slice(3, 6).map((card, index) => (
            <div className="info-cards" key={index}>
              <span className="info-card-icon">
                <span className="info-fa-icon">{card.icon}</span>
              </span>
              <p className="info-card-title">{card.title}</p>
              <p className="info-card-description">{card.description}</p>
            </div>
          ))}
        </div>
        <Link className="details" to={`/category/general/order`}>
          შეუკვეთე
        </Link>
      </div>
    </>
  );
}

export default Categories;
