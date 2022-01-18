import "../App.css";
import { Typography, Button } from "@material-ui/core";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
const Home = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="App">
      <Typography style={{ marginTop: "150px" }} variant="h3">
        Welcome to TopStarMerch
        Please Login!
      </Typography>
      <Button
        style={{ backgroundColor: "darkred", color: "white", marginTop: "80px"  }}
        variant="contained"
        size="small"
        onClick={() => loginWithRedirect()}
      >
        Login 
      </Button>
    </div>
  );
};

export default Home;
