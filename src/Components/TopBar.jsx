import "../App.css";
import * as React from "react";
import { AppBar, Box, Typography, Toolbar } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { LoginContext } from "../Context/LoginContext";
import { useContext } from "react";

const TopBar = () => {
  const [username] = useContext(LoginContext);
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ backgroundColor: "darkred" }} position="static">
          <Toolbar>
            <Typography variant="h6">TopStarMerch</Typography>
            <div style={{ display: "flex", marginLeft: "auto" }}>
              <Typography>
                {username ? username: null}
              </Typography>{" "}
              <AccountCircle style={{ marginLeft: "10px" }} />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Box style={{ marginTop: "30px" }} />
    </React.Fragment>
  );
};

export default TopBar;
