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
import { Loading } from '../Components/index'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getAccessTokenSilently,user } = useAuth0();
  
  const index = user.sub.indexOf("|")
  const onlyId = user.sub.slice(index + 1,user.sub.length)
  const transaction = {
    userid: onlyId,
    productid: location.state.productid,
  };
  console.log(transaction.productid);
  console.log(transaction.userid);

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `http://localhost:8506/Transactions/${transaction.userid}/${location.state.productid}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(transaction),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    callSecureApi();
    navigate("/TransactionDetails");
  };

  return (
    <React.Fragment>
      <Typography variant="h5" style={{ marginTop: "40px" }}>
        Are you sure you want to purchase this product?
      </Typography>

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
                onClick={handleSubmit}
              >
                Buy Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withAuthenticationRequired(ProductDetails, {
  onRedirecting: () => <Loading />,
});

