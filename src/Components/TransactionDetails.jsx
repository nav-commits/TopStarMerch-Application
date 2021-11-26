import "../App.css";
import * as React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@material-ui/core/";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { useNavigate } from "react-router-dom";

const TransactionDetails = () => {
  const [transactions,setTransactions] = useState([]);
  const navigate = useNavigate();


  const transactionDetails = () => {
    fetch("http://localhost:8083/Transactions/1")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTransactions(data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    transactionDetails();
  }, []);
  return (
    <React.Fragment>
      <Grid container direction="row" justifyContent="center">
        <Grid item xs={3}>
          <Alert
            variant="outlined"
            style={{ marginTop: "90px" }}
            severity="success"
          >
            Product Purchased!
          </Alert>
        </Grid>
      </Grid>

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

      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="center"
        style={{ marginLeft: "2px", marginTop: "40px" }}
      >
        {transactions.filter((i, index) => (index < 1)).map((transaction, index) => (
          <Grid item xs={3}>
            <Card style={{ height: "250px" }} key={index}>
              <Typography variant="h5">Transaction Details</Typography>
              <CardContent>
                <Typography align="left" variant="h6" gutterBottom>
                  ProductName:{transaction.productname}
                </Typography>
                <Typography align="left" variant="h6" gutterBottom>
                  Price: {transaction.price}
                </Typography>
                <Typography align="left" variant="h6" gutterBottom>
                  Quantity:  {transaction.quantity}
                </Typography>
                <Typography align="left" variant="h6" gutterBottom>
                  productid: {transaction.productid}
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
