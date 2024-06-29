import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import "../styles/NavBarSet.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserContext } from "../contexts/UserContext";

function NavBarSet({ onSearch }) {
  const { isToggle, setIsToggle } = useContext(UserContext);
  const { isRegistered, handleLogout, isBusiness, isAdmin } =
    useContext(UserContext);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  useEffect(() => {
    if (isToggle) {
      document.body.setAttribute("data-bs-theme", "dark");
      document.body.style.color = "white";
      document.body.classList.add("white-text");
    } else {
      document.body.removeAttribute("data-bs-theme");
      document.body.style.color = "black";
      document.body.classList.remove("white-text");
    }
  }, [isToggle]);

  const handleLogoutClick = () => {
    handleLogout();
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <>
      <Navbar
        expand="md"
        className={["bg-body-tertiary mb-3", "nav-cont"]}
        style={{ height: "40px" }}
        sticky="top"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Business Cards
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                <Nav.Link as={Link} style={{ fontSize: "15px" }} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} style={{ fontSize: "15px" }} to="/about">
                  About
                </Nav.Link>
                {isRegistered && (
                  <>
                    <Nav.Link
                      as={Link}
                      style={{ fontSize: "15px" }}
                      to="/fav-cards"
                    >
                      Fav Cards
                    </Nav.Link>
                    {(isBusiness || isAdmin) && (
                      <>
                        <Nav.Link
                          as={Link}
                          style={{ fontSize: "15px" }}
                          to="/my-cards"
                        >
                          My Cards
                        </Nav.Link>
                      </>
                    )}
                  </>
                )}
              </Nav>
              <div className="d-flex ms-auto">
                <Form className="d-flex me-3">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    style={{ width: "150px" }}
                    onChange={(e) => onSearch(e.target.value)}
                  />
                </Form>
                <Button
                  className="wrapperBtn me-3"
                  variant="outline-primary"
                  onClick={handleToggle}
                >
                  <div className="icon-wrapper">
                    <Brightness2Icon
                      className={`icon ${isToggle ? "" : "hidden"}`}
                    />
                    <Brightness7Icon
                      className={`icon ${isToggle ? "hidden" : ""}`}
                    />
                  </div>
                </Button>
                {isRegistered ? (
                  <div>
                    <AccountCircleIcon style={{ marginRight: "10px" }} />
                    <Button
                      style={{
                        fontSize: "15px",
                        height: "35px",
                        textAlign: "center",
                      }}
                      className="justify-content-start pe-3"
                      variant="outline-primary"
                      onClick={handleLogoutClick}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Nav className="justify-content-start pe-3">
                      <Nav.Link
                        as={Link}
                        style={{ fontSize: "15px" }}
                        to="/signup"
                      >
                        Sign Up
                      </Nav.Link>
                    </Nav>
                    <Nav className="justify-content-start pe-3">
                      <Nav.Link
                        as={Link}
                        style={{ fontSize: "15px" }}
                        to="/login"
                      >
                        Log in
                      </Nav.Link>
                    </Nav>
                  </>
                )}
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarSet;
