import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarSet from "./components/NavBarSet.jsx";
import Home from "./components/Home.jsx";
import FavCards from "./components/FavCards.jsx";
import MyCards from "./components/MyCards.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { UserProvider } from "./contexts/UserContext";
import { useState } from "react";
import Footer from "./components/Footer.jsx";
import About from "./components/About.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <NavBarSet onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/fav-cards"
              element={<FavCards searchQuery={searchQuery} />}
            />
            <Route
              path="/my-cards"
              element={<MyCards searchQuery={searchQuery} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
