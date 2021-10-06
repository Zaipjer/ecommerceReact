import React from 'react';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import accouting from 'accounting';
import { Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

const Total = () => {
    // Obtener el state
    const products = useSelector((state) => state.products.basket);

    const priceTotal = () => {
        return products?.reduce((amount, item) => item.price + amount, 0);
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "20vh" }}>
            <h5>Total items: {products.length}</h5>
            <h5> {accouting.formatMoney(priceTotal())}</h5>
            <Link to='/checkout' style={{textDecoration: 'none'}}>
                <Button sx={{ marginTop: "2rem" }} variant="contained" color="secondary">Check out</Button>
            </Link>
        </Box>
    );
}

export default Total;