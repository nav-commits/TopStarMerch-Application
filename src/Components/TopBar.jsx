import "../App.css";
import React from "react";
import { AppBar, Box, Typography, Toolbar, Button } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const btnstyle = {
    margin: "10px 0",
    backgroundColor: "darkred",
    marginRight: "40px",
  };
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 2 }}>
        <AppBar style={{ backgroundColor: "darkred" }} position="static">
          <Toolbar>
            <Typography variant="h6">
              <Link to="/Products" style={{ textDecoration: "none", color: "white" }}>
                TopStarMerch{" "}
              </Link>
            </Typography>
            <div style={{ display: "flex", marginLeft: "auto" , marginRight:'20px'}}>
              {isAuthenticated && <Typography>{user.name}</Typography>}
              {isAuthenticated && (
                <AccountCircle style={{ marginLeft: "10px", marginRight:"10px",}} fontSize={"medium"} />
              )}
              {isAuthenticated && (
                <Typography style={{cursor:'pointer'}} onClick={() => logout()}>Logout</Typography>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Box style={{ marginTop: "30px" }} />
    </React.Fragment>
  );
};

export default TopBar;
