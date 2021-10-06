import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import accouting from 'accounting';

// Redux
import { useSelector } from 'react-redux';

export default function Review() {

    // Obtener el state
    const products = useSelector((state) => state.products.basket);

    const priceTotal = () => {
        return products?.reduce((amount, item) => item.price + amount, 0);
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Resumen de pedido
            </Typography>
            <List disablePadding>
                {products.map((product, index) => (
                    <ListItem key={index} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={product.name} secondary={product.description} sx={{ pr: 2 }} />
                        <Typography variant="body2">{accouting.formatMoney(product.price)}</Typography>
                    </ListItem>
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary='Envío' secondary='' />
                    <Typography variant="body2">
                        Gratis
                    </Typography>
                </ListItem>

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {accouting.formatMoney(priceTotal())}
                    </Typography>
                </ListItem>
            </List>
        </React.Fragment>
    );
}