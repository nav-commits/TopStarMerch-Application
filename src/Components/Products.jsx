import "../App.css";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Box,
  TextField,
} from "@material-ui/core/";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const {getAccessTokenSilently,user } = useAuth0();

  console.log(user)

  React.useEffect(() => {
    const callSecureApi = async () => {
      try {
        const token = await getAccessTokenSilently();

        const response = await fetch("http://localhost:8500/ProductInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        console.log(responseData)
        setTimeout(() => {
          setProducts(responseData);
          setLoading(false);
        }, 1000);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.log(error);
        setLoading(false);
        setProducts([]);
      }
    };
    callSecureApi();
  }, []);
  
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.productname.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [value, products]);
  return (
    <React.Fragment>

      <Box
        sx={{
          width: 800,
          maxWidth: "100%",
        }}
      >
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ color: "red" }}
          size="large"
          id="outlined-basic"
          label="Search By Product Name"
          variant="outlined"
          style={{ width: "50%" }}
        />
      </Box>
      {error && (
        <Typography variant="h4" align="center" style={{ marginTop: "40px" }}>
          {error}
        </Typography>
      )}
      {loading && (
        <Typography variant="h4" align="center" style={{ marginTop: "40px" }}>
          Fetching Products...
        </Typography>
      )}
      <Grid
        container
        spacing={4}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        style={{ marginLeft: "2px", marginTop: "80px" }}
      >
        {/* data mapping will happen here */}
        {filteredProducts.map((product, index) => (
          <Grid item xs={2}>
            <Card key={index}>
              <CardMedia image={product.imageurl} style={{ height: "240px" }} />
              <CardContent>
                <Typography align="left" variant="h6" gutterBottom>
                  Price: $ {product.price}
                </Typography>
                <Typography align="left" variant="h6" gutterBottom>
                  ProductName:{product.productname}
                </Typography>
                <Typography align="left" variant="h6" gutterBottom>
                  Quantity: {product.quantity}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  style={{ backgroundColor: "darkred", color: "white" }}
                  variant="contained"
                  size="small"
                  onClick={() => {
                    navigate(`/ProductDetails/${product.productid}`, {
                      state: {
                        productid: product.productid,
                        productname: product.productname,
                        productimage: product.imageurl,
                        productquantity: product.quantity,
                        productprice: product.price,
                      },
                    });
                  }}
                >
                  Buy Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default Products;
