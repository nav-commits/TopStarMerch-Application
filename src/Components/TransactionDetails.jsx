import "../App.css";
import * as React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  CardMedia,
} from "@material-ui/core/";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

const TransactionDetails = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const transactionDetails = () => {
    fetch("http://localhost:8083/Transaction/1")
      .then((response) => {
        if (!response.ok) {
          throw Error("could not fetch data for that resource");
        }
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          setSuccess(true);
          setTransactions(data);
          setError(null);
        }, 1000);
        console.log(data);

        setTimeout(() => {
          setSuccess(false);
        }, 4000);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
        setSuccess(false);
      });
  };
 
  React.useEffect(() => {
    transactionDetails();
  }, []);
  return (
    <React.Fragment>
      <Grid container direction="row" justifyContent="flex-start">
        <Grid item xs={1}>
          <Button
            style={{
              backgroundColor: "darkred",
              color: "white",
              marginTop: "5px",
            }}
            variant="contained"
            size="medium"
            onClick={() => {
              navigate("/Products");
            }}
          >
            Go Back
          </Button>
        </Grid>
      </Grid>

      {success && (
        <Grid container direction="row" justifyContent="center">
          <Grid item xs={3}>
            <Alert
              variant="outlined"
              style={{ marginTop: "20px" }}
              severity="success"
            >
              Product Purchased!
            </Alert>
          </Grid>
        </Grid>
      )}

      {error && (
        <Typography variant="h4" align="center" style={{ marginTop: "40px" }}>
          {error}
        </Typography>
      )}

      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="center"
        style={{ marginLeft: "2px", marginTop: "40px" }}
      >
        {transactions.map((transaction, index) => (
          <Grid item xs={3}>
            <Card style={{ height: "490px" }} key={index}>
              <CardMedia
                image={transaction.imageurl}
                style={{ height: "250px" }}
              />
              <Typography variant="h5">Transaction Details</Typography>
              <CardContent>
                <Typography align="left" variant="h6" gutterBottom>
                  ProductName:{transaction.productname}
                </Typography>
                <Typography align="left" variant="h6" gutterBottom>
                  Price: {transaction.price}
                </Typography>
                <Typography align="left" variant="h6" gutterBottom>
                  Quantity: {transaction.quantity}
                </Typography>
                <Typography align="left" variant="h6" gutterBottom>
                  TransactionCreation: {dayjs(transaction.createdAt).format("ddd, MMM D, YYYY h:mm A")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default TransactionDetails;
