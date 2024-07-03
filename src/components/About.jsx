import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Paper } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import "./module.css";

const About = () => {
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="d-flex justify-content-center mt-2">
      <div
        className="d-flex flex-column align-items-center mt-2"
        style={{ width: "80%" }}
      >
        <div className="headings" style={{ width: "80%", textAlign: "center" }}>
          <h3>About</h3>
          <br />
          <h6>
            Welcome to my Business Card creator website! <br />
            This platform is designed to help you manage and store business
            cards effortlessly. <br />
            Whether it's for you'r own use or business needs, our site offers a
            convenient way to keep track of useful contacts, favorite
            businesses, and more. Just what you need to be connected with
            professionals, clients, and others. Make youre own cards and share
            them with others, Show the world what you have to offer.
          </h6>
        </div>
        <div
          className="d-flex flex-row flex-wrap justify-content-around align-items-center mt-2"
          style={{
            width: "100%",
            paddingTop: "20px",
          }}
        >
          <div className="about-text mt-2">
            <h3>This is how it works</h3>
            <h6 style={{ textAlign: "left", marginTop: "40px" }}>
              1. Create an account <br />
              <br />
              2. Create a business card <br />
              <br />
              3. Share your card with others <br />
              <br />
              4. Save other cards to your account <br />
              <br />
              5. Stay connected with others
              <br />
              <br />
              6. Pro tip click the picture to see the full card
            </h6>
          </div>
          <div className="about-card">
            <Paper
              elevation={5}
              style={{
                display: "flex",
                width: "14rem",
                justifyContent: "center",
                height: "450px",
              }}
              className="card"
            >
              <div
                style={{
                  display: "flex",
                  width: "14rem",
                  justifyContent: "center",
                  height: "450px",
                }}
                className="card"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                    width: "100%",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      maxWidth: "14rem",
                    }}
                    src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/professional-business-cards-design-template-8cc9eee098890c5620a59bda6eac120d_screen.jpg?ts=1677254436"
                    alt="Business Card"
                    onClick={() => setShowPopup(true)}
                  />
                </div>
                <div className="m-auto">
                  <h5>Business Name</h5>
                  <h6>Business Description </h6>
                </div>
                <div className="mt-auto">
                  <p style={{ marginTop: "-10px" }}>Phone: 050-1234567</p>
                  <p style={{ marginTop: "-10px" }}>
                    Address: 1234 Business Street, City, Country
                  </p>
                  <p style={{ marginTop: "-10px" }}>
                    Business Number: 1234567890
                  </p>
                  <div className="d-flex justify-content-around">
                    <button style={{ border: "none", background: "none" }}>
                      <a href={`tel:050-1234567`}>
                        <PhoneIcon style={{ color: "blue" }} />
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup-inner">
              <div id="close-btn">
                <button
                  className="close-btn"
                  style={{ marginLeft: "auto" }}
                  onClick={closePopup}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="m-auto">
                <h4>Business Name</h4>
                <h5>Business Description </h5>
              </div>
              <div className="mt-auto">
                <p style={{ marginTop: "30px" }}>Phone: 050-1234567</p>
                <p style={{ marginTop: "-10px" }}>
                  Address: 1234 Business Street, City, Country
                </p>
                <p style={{ marginTop: "-10px" }}>
                  Business Number: 1234567890
                </p>
              </div>
              <img
                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/professional-business-cards-design-template-8cc9eee098890c5620a59bda6eac120d_screen.jpg?ts=1677254436"
                alt="Business Card"
              />
              <p>Card Number: 123456</p>
            </div>
          </div>
        )}
        <div style={{ paddingTop: "50px", paddingBottom: "100px" }}>
          <h6>
            What are you waiting for? <Link to="/Signup">Sign up</Link> now!{" "}
            <br />
            Already have an account? <Link to="/Login">Login </Link> here
          </h6>
        </div>
      </div>
    </div>
  );
};

export default About;
