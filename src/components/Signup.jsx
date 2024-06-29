import React, { useState, useEffect } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imageUrl: "",
    imageAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    isBusiness: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [formValid, setFormValid] = useState(false);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[!@#$%^&*_-]).{8,}$/;
    return regex.test(password);
  };

  const validateForm = () => {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      state,
      country,
      city,
      street,
      houseNumber,
      zip,
    } = formData;

    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      phone.trim() !== "" &&
      email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/) &&
      password.length >= 8 &&
      state.trim() !== "" &&
      country.trim() !== "" &&
      city.trim() !== "" &&
      street.trim() !== "" &&
      houseNumber.trim() !== "" &&
      zip.trim() !== ""
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
      alert("Please fill out all required fields correctly.");
      return;
    }
    if (!validatePassword(formData.password)) {
      alert(
        "Password must contain at least one uppercase letter, one lowercase letter, at least four digits, and one special character (!@#$%^&*-_)."
      );
      return;
    }
    const requestBody = {
      name: {
        first: formData.firstName,
        middle: formData.middleName,
        last: formData.lastName,
      },
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      image: {
        url: formData.imageUrl,
        alt: formData.imageAlt,
      },
      address: {
        state: formData.state,
        country: formData.country,
        city: formData.city,
        street: formData.street,
        houseNumber: parseInt(formData.houseNumber),
        zip: parseInt(formData.zip),
      },
      isBusiness: formData.isBusiness,
    };

    try {
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        imageUrl: "",
        imageAlt: "",
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
        isBusiness: false,
      });
      setFormValid(false);
    }
  };
  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div className="container" style={{ width: "90%" }}>
      <form
        style={{ marginBottom: "150px", width: "100%" }}
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="col-sm-6 mt-2">
            <label>First Name:</label>
            <input
              type="text"
              style={{ height: "25px", textAlign: "center" }}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-sm-6 mt-2">
            <label>Middle Name:</label>
            <input
              type="text"
              style={{ height: "25px", textAlign: "center" }}
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 mt-4">
            <label>Last Name:</label>
            <input
              type="text"
              style={{ height: "25px", textAlign: "center" }}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-sm-6 mt-4">
            <label>Phone:</label>
            <input
              type="text"
              style={{ height: "25px", textAlign: "center" }}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 mt-4">
            <label>Email:</label>
            <input
              type="email"
              style={{ height: "25px", textAlign: "center" }}
              name="email"
              value={formData.email}
              onChange={handleChange}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              required
              className="form-control"
            />
          </div>
          <div className="col-sm-6 mt-4">
            <label>Password:</label>
            <input
              type="password"
              style={{ height: "25px", textAlign: "center" }}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 mt-4">
            <label>State:</label>
            <input
              type="text"
              style={{ height: "25px", textAlign: "center" }}
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-sm-6 mt-4">
            <label>Country:</label>
            <input
              type="text"
              style={{ height: "25px", textAlign: "center" }}
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 mt-4">
            <label>City:</label>
            <input
              type="text"
              style={{ height: "25px", textAlign: "center" }}
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-sm-6 mt-4">
            <label>Street:</label>
            <input
              type="text"
              style={{ height: "25px", textAlign: "center" }}
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 mt-4">
            <label>House Number:</label>
            <input
              type="number"
              style={{ height: "25px", textAlign: "center" }}
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-sm-6 mt-4">
            <label>ZIP:</label>
            <input
              type="number"
              style={{ height: "25px", textAlign: "center" }}
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 mt-4">
            <label>Website URL:</label>
            <input
              type="text"
              style={{ height: "25px", textAlign: "center" }}
              name="web"
              value={formData.web}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-sm-6 mt-4">
            <label>
              Business Account:
              <input
                type="checkbox"
                name="isBusiness"
                style={{ height: "25px", marginTop: "10px" }}
                checked={formData.isBusiness}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block mt-4"
          disabled={!formValid}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
