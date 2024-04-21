import React from "react";
import "../styles/TopContent.scss";
import cleaner from "../../public/assets/cleaner.png";
import { GiVacuumCleaner } from "react-icons/gi";

function TopContent() {
  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p
            className="text-headline"
            style={{ display: "flex", alignItems: "baseline" }}
          >
            ხარისხი უპირველეს ყოვლისა
            <GiVacuumCleaner
              style={{
                marginLeft: "15px",
                color: "dodgerblue",
                fontSize: "30px",
              }}
            />
          </p>
          <h2 className="text-title">დასუფთავების სერვისი</h2>
          <p className="text-descritpion">
            ჩვენ ვასუფთავებთ უმაღლესი სტანდარტების მიხედვით. სწრაფი დასუფთავება
            თბილისის მასშტაბით
          </p>

          <div className="text-stats">
            <div className="text-stats-container">
              <p>200+</p>
              <p>მომხმარებელი</p>
            </div>

            <div className="text-stats-container">
              <p>50+</p>
              <p>დამლაგებელი</p>
            </div>

            <div className="text-stats-container">
              <p>10+</p>
              <p>წლიანი გამოცდილება</p>
            </div>
          </div>
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={cleaner} alt="cleaner" />
        </div>
      </div>
    </div>
  );
}

export default TopContent;
