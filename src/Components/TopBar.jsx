import "../App.css";
import React from "react";
import {
  AppBar,
  Box,
  Typography,
  Toolbar,
  Button,
  Menu,
  Fade,
  MenuItem,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 2 }}>
        <AppBar style={{ backgroundColor: "darkred" }} position="static">
          <Toolbar>
            <Typography variant="h6">
              <Link
                to="/Products"
                style={{ textDecoration: "none", color: "white" }}
              >
                TopStarMerch{" "}
              </Link>
            </Typography>

            <div
              style={{
                display: "flex",
                marginLeft: "auto",
              }}
            >
              {" "}
              {!isAuthenticated && (
                <Button
                  style={{ color: "darkred", backgroundColor: "white",width:"100px" }}
                  variant="contained"
                  size="small"
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </Button>
              )}
            </div>

            {isAuthenticated && (
              <div
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  marginTop: "15px",
                }}
              >
                <Typography>{user.name}</Typography>
                <Button
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <AccountCircle
                    style={{
                      marginRight: "10px",
                      position: "relative",
                      bottom: "5px",
                      color: "white",
                    }}
                    fontSize={"medium"}
                  />
                </Button>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <Link
                      to="/Products"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Products
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <Link
                      to="/TransactionDetails"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Transactions
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    style={{ cursor: "pointer" }}
                    onClick={() => logout()}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box style={{ marginTop: "30px" }} />
    </React.Fragment>
  );
};

export default TopBar;
