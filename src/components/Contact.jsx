import React from "react";
import "../styles/ContactStyles.scss";

const Contact = () => {
  return (
    <>
      <div className="contact-container">
        <div className="image-container">
          <div className="contact-info">
            <div className="contact_wrapper">
              <div className="contact-details">
                <div className="location">
                  <h2 className="location-heading">მისამართი</h2>
                  <address className="address">
                    <p> საქართველო</p>
                    <p>თბილისის ზღვის პლაზა</p>
                  </address>
                </div>
              </div>
              <div className="contact-methods">
                <div
                  style={{ marginBottom: "20px" }}
                  className="contact-method"
                >
                  <div id="contact">ტელეფონი</div>
                  <a href="tel:+995551627551">+995 558 88 88 88</a>
                </div>
                <div className="contact-method">
                  <div id="contact">Email</div>
                  <a href="mailto:info@Cleanservice.com">
                    Cleanservice@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="google-map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23829.017401453093!2d44.869222400000005!3d41.7069835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d9d3efa1247%3A0x9763e8a33b82cc9!2z4YOX4YOR4YOY4YOa4YOY4YOh4YOY4YOhIOGDluGDpuGDleGDmOGDoSDhg57hg5rhg5Dhg5bhg5A!5e0!3m2!1ska!2sge!4v1713015107189!5m2!1ska!2sge"
                width="100%"
                height="450"
                style={{ borderRadius: "10px" }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
