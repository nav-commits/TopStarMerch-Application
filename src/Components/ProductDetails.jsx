import "../App.css";
import * as React from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  CardMedia,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core/";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const copyTransaction = [{ ...transactions }];
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [sucessfullyPurchase, setSuccessFullyPurchased] = useState(false);

  let copyArray = copyTransaction.filter((copytransaction) => {
    return copytransaction.price !== 50;
  });
  console.log(copyArray);

  const transactionDetails = () => {
    fetch("http://localhost:8083/Transactions/1")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTransactions(copyTransaction);
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
      {showMessage && (
        <Typography variant="h5" style={{ marginTop: "40px" }}>
          Are you sure you want to purchase this product?
        </Typography>
      )}

      <Grid container direction="row" justifyContent="center">
        <Grid item xs={3}>
          {sucessfullyPurchase && (
            <Alert variant="outlined" severity="success">Product Purchased!</Alert>
          )}
        </Grid>
      </Grid>

      <Grid container direction="row" justifyContent="flex-start">
        <Grid item xs={1}>
          <Button
            style={{
              backgroundColor: "darkred",
              color: "white",
              marginTop: "10px",
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
        style={{ marginLeft: "2px", marginTop: "80px" }}
      >
        <Grid item xs={2}>
          <Card>
            <CardMedia
              image={location.state.productimage}
              style={{ height: "240px" }}
            />
            <CardContent>
              <Typography align="left" variant="h6" gutterBottom>
                Price: $ {location.state.productprice}
              </Typography>
              <Typography align="left" variant="h6" gutterBottom>
                ProductName:{location.state.productname}
              </Typography>
              <Typography align="left" variant="h6" gutterBottom>
                Quantity: {location.state.productquantity}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                style={{ backgroundColor: "darkred", color: "white" }}
                variant="contained"
                size="small"
                onClick={() => {
                  setShow(true);
                  setShowMessage(false);
                  setSuccessFullyPurchased(true);
                }}
              >
                Buy Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {/* Transactions Details */}
        {show &&
          copyTransaction.map((transaction, index) => (
            <Grid item xs={3}>
              <Typography variant="h5">Transaction Details</Typography>
              <Card key={index}>
                <CardContent>
                  <Typography align="left" variant="h6" gutterBottom>
                    ProductName:{transaction.productname}
                  </Typography>
                  <Typography align="left" variant="h6" gutterBottom>
                    Price: ${transaction.price}
                  </Typography>
                  <Typography align="left" variant="h6" gutterBottom>
                    Quantity: {transaction.quantity}
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

export default ProductDetails;
