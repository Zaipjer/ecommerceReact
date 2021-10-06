import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import accounting from 'accounting';

// Redux
import { useDispatch } from 'react-redux';
import { eliminarProductoAction } from '../actions/productActions';

export default function CheckoutCard({ product: { id, name, productType, price, rating, image, description }, index }) {

    // Utilizar useDispatch y te crea una función
    const dispatch = useDispatch();

    // Cuando se agrega al carrito
    const removeItem = (id) => {
        //Agregar a carrito
        dispatch(eliminarProductoAction(id, index));

    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                action={
                    <Typography
                        sx={{ marginTop: "1rem" }}
                        variant="h5"
                        color="text.secondary"
                    >
                        {accounting.formatMoney(price)}
                    </Typography>
                }
                title={name}
                subheader="in Stock"
            />
            <CardMedia
                sx={{ height: 0, paddingTop: '56.25%' }}
                image={image}
                title={name}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {productType}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>&#11088;</p>
                        ))}
                </div>
                <IconButton aria-label="delete to cart" onClick={() => removeItem(id)}>
                    <DeleteIcon fontSize='large' />
                </IconButton>
            </CardActions>
        </Card>
    );
}
