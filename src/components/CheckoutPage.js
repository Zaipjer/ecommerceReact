import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import CheckoutCard from "./CheckoutCard";
import Total from "./Total";
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  //const classes = useStyles();
  //const [{ basket }, dispatch] = useStateValue();

  // Obtener el state
  const products = useSelector((state) => state.products.basket);

  return (
    <Box sx={{ flexGrow: 1, padding: "16px", justifyContent: "center" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography align="center" gutterBottom variant="h4">
            Shopping Cart
          </Typography>
        </Grid>
        {products.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center" gutterBottom variant="h6">
              <p>Su carrito actualmente está vació.</p>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  sx={{ marginTop: "2rem" }}
                  variant="contained"
                  color="primary"
                >
                  SEGUIR COMPRANDO
                </Button>
              </Link>
            </Typography>
          </Grid>
        ) : (
          <React.Fragment>
            <Grid item xs={12} sm={8} md={9} container spacing={2}>
              {products.map((item, index) => (
                <Grid item xs={12} sm={8} md={6} lg={4} key={index}>
                  <CheckoutCard product={item} index={index} />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography align="center" gutterBottom variant="h4">
                <Total />
              </Typography>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
