import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../contexts/UserContext";
import "./module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Paper } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyCards = ({ searchQuery }) => {
  const { userID } = useContext(UserContext);
  const [formShown, setFormShown] = useState(false);
  const [myCards, setMyCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formpopup, setFormPopup] = useState(false);
  const { isRegistered } = useContext(UserContext);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQyNGFlOWE4ZDFlYWUxMmQzMWUzNjAiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjk4ODQzNDQyfQ.znXbzyxMKeNrKf3dA8jXQ5CFptM8-iXjeFtqx3XfHD0";
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        {
          ...formData,
          user_id: userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      setFormData({
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
      setFormShown(false);
      toast.success("Card Created Successfuly", {
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
      setMyCards((prevCards) =>
        [...prevCards, response.data].filter((card) => card.user_id === userID)
      );
    } catch (error) {
      toast.error("Failed to create card", {
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
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const createCard = () => {
    setFormShown(!formShown);
  };

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        const response = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
        );
        const filteredCards = response.data.filter(
          (card) => card.user_id === userID
        );
        const cardsWithLikes = filteredCards.map((card) => ({
          ...card,
          liked: card.likes.includes(userID),
        }));
        setMyCards(cardsWithLikes);
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyCards();
  }, [userID, formpopup]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredCards = searchQuery
    ? myCards.filter(
        (card) =>
          card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.web.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.image.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.address.state
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          card.address.country
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          card.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.address.street
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          card.address.houseNumber
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          card.address.zip
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : myCards;

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCard(null);
  };

  const handleLike = async (cardId) => {
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
      setMyCards((prevCards) => {
        return prevCards.map((card) => {
          if (card._id === cardId) {
            const isLiked = card.likes.includes(userID);
            const updatedLikes = isLiked
              ? card.likes.filter((id) => id !== userID)
              : [...card.likes, userID];
            toast.success(
              isLiked ? "Card unliked successfully" : "Card liked successfully",
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              }
            );
            return {
              ...card,
              likes: updatedLikes,
              liked: !isLiked,
            };
          }
          return card;
        });
      });
    } catch (err) {
      toast.error("Failed to Like Card", {
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
        setMyCards((prevCards) =>
          prevCards.filter((card) => card._id !== cardId)
        );
        toast.success("Card Deleted Successfuly", {
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
      setMyCards((prevCards) =>
        prevCards.map((card) =>
          card._id === cardId && card.liked ? response.data : card
        )
      );
      setFormPopup(false);
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
    } catch (err) {
      toast.error("Failed to Edit Card", {
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

  return (
    <div className="container" style={{ paddingBottom: "100px" }}>
      <h3>Your Creations</h3>
      <br />
      <div className="row">
        <div className="col-md-12">
          <section className="d-flex flex-wrap justify-content-center align-items-start gap-5">
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
                    <img
                      style={{
                        height: "200px",
                        maxWidth: "14rem",
                        cursor: "pointer",
                      }}
                      src={card.image.url}
                      alt={card.image.alt}
                      className="card-img-top"
                      onClick={() => handleCardClick(card)}
                    />
                    <div className="m-auto">
                      <h5 className="card-title">{card.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {card.subtitle}
                      </h6>
                    </div>
                    <div className="mt-auto">
                      <p style={{ marginTop: "-10px" }} className="card-text">
                        Phone: {card.phone}
                      </p>
                      <p style={{ marginTop: "-10px" }} className="card-text">
                        Address:{" "}
                        {`${card.address.street}, ${card.address.city}, ${card.address.country}`}
                      </p>

                      <p className="card-text" style={{ marginTop: "-10px" }}>
                        Card Number: {card.bizNumber}
                      </p>
                      <button style={{ border: "none", background: "none" }}>
                        <a href={`tel:${card.phone}`}>
                          <PhoneIcon style={{ color: "blue" }} />
                        </a>
                      </button>
                      {isRegistered && (
                        <>
                          <button
                            style={{ border: "none", background: "none" }}
                            onClick={() => handleLike(card._id)}
                          >
                            {card.liked ? (
                              <FavoriteIcon style={{ color: "blue" }} />
                            ) : (
                              <FavoriteBorderIcon style={{ color: "blue" }} />
                            )}
                          </button>
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
                            <EditIcon style={{ color: "blue" }} />
                          </button>
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
                        </>
                      )}
                    </div>
                  </div>
                </Paper>
              ))
            ) : (
              <h1>No cards created yet</h1>
            )}
          </section>
        </div>
        <div className="col-md-12 mt-4">
          <button className="btn btn-primary col-sm-4" onClick={createCard}>
            {formShown ? "Close form" : "Create a card"}
          </button>
        </div>
      </div>

      {showPopup && selectedCard && (
        <div className="popup">
          <div className="popup-inner">
            <div id="bitch">
              <button
                className="close-btn"
                style={{ marginLeft: "auto" }}
                onClick={closePopup}
              >
                <CloseIcon></CloseIcon>
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

      {formShown && (
        <form
          onSubmit={handleSubmit}
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
                style={{ resize: "none", height: "40px", textAlign: "center" }}
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
      )}
    </div>
  );
};

export default MyCards;
