import "../App.css";
import React, { useState,useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { LoginContext } from "../Context/LoginContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useContext(LoginContext);
  const navigate = useNavigate();
  const [localStateUserName, setLocalStateUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = { username:localStateUserName, password:password };
    axios({
      method: "POST",
      url: "http://localhost:8086/signin",
      data: login,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
          
        // store the user in localStorage and State
        localStorage.setItem("user", response.data.username);
        const getUser = localStorage.getItem("user");
        setUsername(getUser)
        
        // stores the jwt in local storage
        localStorage.setItem(
          "authorization",
          JSON.stringify(response.data.jwt)
        );

        if (response.data.jwt) {
          navigate("/Products");
        } else {
          alert("Authentication failure");
        }
      })
      .catch(function (err) {
        console.log(err);
      });

  };

  useEffect(() => {
   setUsername(username)
  }, [username]);
 


  const paperStyle = {
    padding: 20,
    height: "30vh",
    width: 280,
    margin: "30px auto",
  };
  const avatarStyle = { backgroundColor: "darkred" };
  const btnstyle = { margin: "20px 0", backgroundColor: "darkred" };
  return (
    <React.Fragment>
      <Typography style={{ marginTop: "80px" }} variant="h3">
        Please Login!
      </Typography>
      
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography style={{ marginTop: "10px" }} variant="h5">
              Login
            </Typography>
          </Grid>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            value={localStateUserName}
            onChange={(e) => setLocalStateUserName(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
