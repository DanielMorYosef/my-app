import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCardIcon from "@mui/icons-material/AddCard";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const { isRegistered, isBusiness, isToggle, isAdmin } =
    useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/about");
        break;
      case 1:
        if (isRegistered) navigate("/fav-cards");
        break;
      case 2:
        if (isBusiness || isAdmin) navigate("/my-cards");
        break;
      default:
        break;
    }
  };

  return (
    <div
      id="footer"
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        boxShadow: isToggle
          ? "0px -2px 5px 0px rgba(0,0,0,0.75)"
          : "0px -2px 5px 0px rgba(0,0,0,0.75)",
        borderRadius: "20%",
        backgroundColor: isToggle ? "black" : "white",
        color: isToggle ? "white" : "black",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigationChange}
        style={{
          backgroundColor: isToggle ? "black" : "white",
          color: isToggle ? "white" : "black",
        }}
      >
        <BottomNavigationAction
          label="About"
          icon={<InfoIcon style={{ color: "blue" }} />}
        />
        {isRegistered && (
          <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteIcon style={{ color: "blue" }} />}
          />
        )}
        {(isBusiness || isAdmin) && (
          <BottomNavigationAction
            label="MyCards"
            icon={<AddCardIcon style={{ color: "blue" }} />}
          />
        )}
      </BottomNavigation>
    </div>
  );
}
