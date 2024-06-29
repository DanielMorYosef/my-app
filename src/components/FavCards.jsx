import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Paper } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserContext } from "../contexts/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./module.css";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FavCards = ({ searchQuery }) => {
  const { favCards, setFavCards, isAdmin } = useContext(UserContext);
  const { userID } = useContext(UserContext);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [formpopup, setFormPopup] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCard(null);
  };

  const handleLike = async (cardId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const header = {
        headers: {
          "x-auth-token": token,
        },
      };
      const response = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        header
      );
      toast.success("Card Unliked Successfuly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setFavCards((prevCards) => {
        return prevCards.map((card) => {
          if (card._id === cardId) {
            return {
              ...card,
              liked: !card.liked,
            };
          }
          return {
            ...card,
            liked: card.liked,
          };
        });
      });
    } catch (err) {
      toast.error("Error Unliking card", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFavCards = async () => {
      axios
        .get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards")
        .then((response) => {
          setLoading(true);
          const filteredCards = response.data.filter((card) =>
            card.likes.includes(userID)
          );
          setFavCards(filteredCards);
          setLiked(true);
        })
        .catch((error) => {
          console.error("Error fetching cards:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchFavCards();
  }, [favCards]);

  const filteredCards = favCards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteCard = async (cardId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this card?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const header = {
        headers: {
          "x-auth-token": token,
        },
      };
      const response = await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        header
      );
      if (response.status === 200) {
        setFavCards((prevCards) =>
          prevCards.filter((card) => card._id !== cardId)
        );
        toast.success("Card Deleted Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (err) {
      toast.error("Failed to Delete Card", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    image: {
      url: "",
      alt: "",
    },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("image.") || name.includes("address.")) {
      const [parentKey, childKey] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [parentKey]: {
          ...prevState[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const editCard = (card) => {
    setFormPopup(true);
    setFormData(card);
  };

  const handleEdit = async (event, cardId) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const header = {
        headers: {
          "x-auth-token": token,
        },
      };
      const updatedCard = {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        phone: formData.phone,
        email: formData.email,
        web: formData.web,
        image: {
          url: formData.image.url,
          alt: formData.image.alt,
        },
        address: {
          state: formData.address.state,
          country: formData.address.country,
          city: formData.address.city,
          street: formData.address.street,
          houseNumber: formData.address.houseNumber,
          zip: formData.address.zip,
        },
      };

      const response = await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        updatedCard,
        header
      );
      setFavCards((prevCards) =>
        prevCards.map((card) =>
          card._id === cardId && card.liked ? response.data : card
        )
      );
      toast.success("Card Edited Successfuly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setFormPopup(false);
    } catch (err) {
      toast.error("Error editing card", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Never lose Your favorite cards</h3>
      <br />
      <section
        style={{ paddingBottom: "100px" }}
        className="d-flex flex-wrap justify-content-center align-items-start gap-5"
      >
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <Paper
              elevation={3}
              style={{
                display: "flex",
                width: "14rem",
                justifyContent: "center",
                height: "450px",
              }}
              key={card._id}
              className="card"
            >
              <div
                style={{
                  display: "flex",
                  width: "14rem",
                  justifyContent: "center",
                  height: "450px",
                }}
                key={card._id}
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
                    src={card.image.url}
                    alt={card.image.alt}
                    onClick={() => handleCardClick(card)}
                  />
                </div>
                <div className="m-auto">
                  <h5>{card.title}</h5>
                  <h6>{card.subtitle}</h6>
                </div>
                <div className="mt-auto">
                  <p style={{ marginTop: "-10px" }}>Phone: {card.phone}</p>
                  <p style={{ marginTop: "-10px" }}>
                    Address:{" "}
                    {`${card.address.street}, ${card.address.city}, ${card.address.country}`}
                  </p>
                  <p style={{ marginTop: "-10px" }}>
                    Card Number: {card.bizNumber}
                  </p>
                  <div className="d-flex justify-content-around">
                    <button style={{ border: "none", background: "none" }}>
                      <a href={`tel:${card.phone}`}>
                        <PhoneIcon style={{ color: "blue" }} />
                      </a>
                    </button>
                    <button
                      style={{ border: "none", background: "none" }}
                      onClick={() => handleLike(card._id)}
                    >
                      {liked ? (
                        <FavoriteIcon style={{ color: "blue" }} />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </button>
                    {(card.user_id === userID || isAdmin) && (
                      <>
                        <button
                          style={{ border: "none", background: "none" }}
                          onClick={() => deleteCard(card._id)}
                        >
                          <DeleteIcon style={{ color: "blue" }} />
                        </button>
                        <button
                          style={{ border: "none", background: "none" }}
                          onClick={() => editCard(card)}
                        >
                          <EditIcon
                            style={{ color: "blue", background: "none" }}
                          />
                        </button>
                      </>
                    )}
                  </div>
                  {formpopup && (
                    <div className="popup">
                      <div className="popup-inner">
                        <div id="bitch">
                          <button
                            className="close-btn"
                            style={{ marginLeft: "auto" }}
                            onClick={() => setFormPopup(false)}
                          >
                            <CloseIcon></CloseIcon>
                          </button>
                        </div>
                        <h3>Edit youre card</h3>
                        <form
                          onSubmit={(e) => handleEdit(e, formData._id)}
                          style={{ width: "100%" }}
                          className="col-md-12 mt-5"
                        >
                          <div className="row">
                            <div className="col-sm-6 mt-2">
                              <input
                                required
                                type="text"
                                style={{ textAlign: "center" }}
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Title*"
                              />
                            </div>
                            <div className="col-sm-6 mt-2">
                              <input
                                required
                                type="text"
                                style={{ textAlign: "center" }}
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Subtitle*"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 mt-4">
                              <textarea
                                required
                                style={{
                                  resize: "none",
                                  height: "40px",
                                  textAlign: "center",
                                }}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Description*"
                              />
                            </div>
                            <div className="col-sm-6 mt-4">
                              <input
                                required
                                type="text"
                                style={{ textAlign: "center" }}
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Phone*"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 mt-4">
                              <input
                                required
                                type="email"
                                style={{ textAlign: "center" }}
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Email*"
                              />
                            </div>
                            <div className="col-sm-6 mt-4">
                              <input
                                type="text"
                                name="web"
                                style={{ textAlign: "center" }}
                                value={formData.web}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Website URL"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 mt-4">
                              <input
                                required
                                type="text"
                                style={{ textAlign: "center" }}
                                name="image.url"
                                value={formData.image.url}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Img URL*"
                              />
                            </div>
                            <div className="col-sm-6 mt-4">
                              <input
                                required
                                type="text"
                                style={{ textAlign: "center" }}
                                name="image.alt"
                                value={formData.image.alt}
                                onChange={handleChange}
                                placeholder="Img Alt*"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 mt-4">
                              <input
                                type="text"
                                name="address.state"
                                style={{ textAlign: "center" }}
                                value={formData.address.state}
                                placeholder="State"
                                onChange={handleChange}
                                className="form-control"
                              />
                            </div>
                            <div className="col-sm-6 mt-4">
                              <input
                                required
                                type="text"
                                style={{ textAlign: "center" }}
                                name="address.country"
                                value={formData.address.country}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Country*"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 mt-4">
                              <input
                                required
                                type="text"
                                style={{ textAlign: "center" }}
                                name="address.city"
                                value={formData.address.city}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="City*"
                              />
                            </div>
                            <div className="col-sm-6 mt-4">
                              <input
                                required
                                type="text"
                                style={{ textAlign: "center" }}
                                name="address.street"
                                value={formData.address.street}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Street*"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 mt-4">
                              <input
                                required
                                type="number"
                                style={{ textAlign: "center" }}
                                name="address.houseNumber"
                                value={formData.address.houseNumber}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="House Number*"
                              />
                            </div>
                            <div className="col-sm-6 mt-4">
                              <input
                                required
                                type="number"
                                style={{ textAlign: "center" }}
                                name="address.zip"
                                value={formData.address.zip}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="ZIP*"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <button
                                type="submit"
                                className="btn btn-primary btn-block col-sm-4 mt-4"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Paper>
          ))
        ) : (
          <h1>No cards liked yet</h1>
        )}
      </section>
      {showPopup && selectedCard && (
        <div className="popup">
          <div className="popup-inner">
            <div id="bitch">
              <button
                className="close-btn"
                style={{ marginLeft: "auto" }}
                onClick={closePopup}
              >
                <CloseIcon />
              </button>
            </div>
            <h4>{selectedCard.title}</h4>
            <h5>{selectedCard.subtitle}</h5>
            <p>Description: {selectedCard.description}</p>
            <p>Phone: {selectedCard.phone}</p>
            <p>Email: {selectedCard.email}</p>
            <p>Website: {selectedCard.web}</p>
            <p>
              Address:{" "}
              {`${selectedCard.address.street}, ${selectedCard.address.city}, ${selectedCard.address.country}`}
            </p>
            <img src={selectedCard.image.url} alt={selectedCard.image.alt} />
            <p>Card Number: {selectedCard.bizNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavCards;
