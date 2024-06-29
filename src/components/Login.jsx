import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { handleLoginSuccess, setUserID } = useContext(UserContext);
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    validateForm();
  };
  useEffect(() => {
    validateForm();
  }, [loginData]);

  const handleCopyPasteCutDrag = (e) => {
    e.preventDefault();
  };

  const validateForm = () => {
    const { email, password } = loginData;
    if (
      email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/) &&
      password.length >= 8
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data;
      localStorage.setItem("authToken", token);
      const decodedToken = jwtDecode(token);
      setUserID(decodedToken._id);
      handleLoginSuccess(decodedToken.isBusiness, decodedToken.isAdmin);
      navigate("/");
    } catch (error) {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <label>Email:</label>
        <input
          type="email"
          name="email"
          style={{
            marginTop: "10px",
            height: "25px",
            textAlign: "center",
            margin: "auto",
            width: "50%",
            justifyContent: "center",
          }}
          className="form-control"
          value={loginData.email}
          onChange={handleChange}
          onCopy={handleCopyPasteCutDrag}
          onCut={handleCopyPasteCutDrag}
          onPaste={handleCopyPasteCutDrag}
          onDrag={handleCopyPasteCutDrag}
          required
        />
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "10px",

          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          style={{
            height: "25px",
            textAlign: "center",
            margin: "auto",
            width: "50%",
            justifyContent: "center",
          }}
          className="form-control"
          onCopy={handleCopyPasteCutDrag}
          onCut={handleCopyPasteCutDrag}
          onPaste={handleCopyPasteCutDrag}
          onDrag={handleCopyPasteCutDrag}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-block mt-4"
        disabled={!formValid}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
