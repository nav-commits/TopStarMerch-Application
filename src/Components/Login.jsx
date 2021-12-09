import "../App.css";
import React from "react";
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
const [username,setUsername,password,setPassword,] = useContext(LoginContext);
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    const login = { username, password};

    axios({
      method: "POST",
      url: "http://localhost:8086/signin",
      data: login,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (res) {
      localStorage.setItem("authorization", res.data.token);
      if (res.data) {
        navigate("/Products");
      } else {
        alert("Authentication failure");
      }
      })
      .catch(function (err) {
        console.log(err);
      });

      setUsername('')
      setPassword('')  
  };


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
            <Typography style={{marginTop:'10px'}} variant="h5">Login</Typography>
          </Grid>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
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
