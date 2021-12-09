import "../App.css";
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
import { RegisterContext } from "../Context/RegisterContext";
import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [
    username,
    setUsername,
    password,
    setPassword,
    address,
    setAddress,
    contact,
    setContact,
  ] = useContext(RegisterContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const register = { username, password, address, contact };

    axios({
      method: "POST",
      url: "http://localhost:8086/signup",
      data: register,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        console.log(response.data);
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });

      navigate("/Login");

      setContact('')
      setAddress('')
      setUsername('')
      setPassword('')
      
  };
  const paperStyle = {
    padding: 20,
    height: "40vh",
    width: 350,
    margin: "30px auto",
  };
  const avatarStyle = { backgroundColor: "darkred" };
  const btnstyle = { margin: "20px 0", backgroundColor: "darkred" };
  return (
    <React.Fragment>
      <Typography style={{ marginTop: "80px" }} variant="h3">
        Welcome to TopStarMerch!
      </Typography>

      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography style={{ marginTop: "10px" }} variant="h5">
              Register
            </Typography>
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
          <TextField
            label="Address"
            placeholder="Enter Address"
            fullWidth
            required
            value={address}
            onChange={(e)=> setAddress(e.target.value)}
          />
          <TextField
            label="Contact Number"
            placeholder="Enter Contact Number"
            fullWidth
            required
            value={contact}
            onChange={(e)=> setContact(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleSubmit}
          >
            Register
          </Button>
          <Typography>
            {" "}
            Already have an account?
            <Link href="/Login" style={{ color: "darkred" }}>
              Sign In
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
