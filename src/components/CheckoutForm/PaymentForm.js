import React, { useState } from 'react';
import { Button, CircularProgress, Divider, Typography } from '@mui/material';
import Review from './Review';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Box } from '@mui/system';
import accouting from 'accounting';
import axios from 'axios';

// Redux
import { useSelector } from 'react-redux';
import { colocarMensajeAction } from '../../actions/shippingDataAction';
import { vaciarCarritoProductoAction } from '../../actions/productActions';
import { useDispatch } from 'react-redux';

const stripePromise = loadStripe('pk_test_51JgJ3xGqqFvu0TqeixPd8LhuAxm2L054dpL5tAiV6FW3dWTqrLI97r9gkh8pkmQejtYBbBj0cTt1AuLqtakrmN8I00eZt0VRBr');

const CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
        base: {
            iconColor: "rgb(240,57,122)",
            color: "#333",
            fontSize: '18px',
            '::placeholder': {
                color: '#ccc',
            },
        },
        invalid: {
            color: '#e5424d',
            ':focus': {
                color: "#303238",
            },
        },
    },
};

const CheckoutForm = ({ backStep, nextStep, priceTotal }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    // Utilizar useDispatch y te crea una función
    const dispatch = useDispatch();

    // Cuando se agrega al carrito
    const setMessageData = (data) => {
        //Agregar a carrito
        dispatch(colocarMensajeAction(data));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement
        });
        setLoading(true);
        if (!error) {
            try {
                const { id } = paymentMethod;
                axios.post("http://localhost:3001/api/checkout", {
                    id,
                    amount: priceTotal() * 100,
                })
                    .then(res => {
                        //console.log(res.data.message);
                        setMessageData(res.data.message);
                        if (res.data.message === "Successful payment") {
                            dispatch(vaciarCarritoProductoAction());
                        }
                        elements.getElement(CardElement).clear();
                        nextStep();
                    })
                    .catch(error => {
                        console.log(error);
                        nextStep();
                    });
            } catch (error) {
                console.log(error);
                nextStep();
            }
            setLoading(false);
        }
    }

    const pagar = () => {
        return ("Pagar " + accouting.formatMoney(priceTotal()));
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={() => backStep()} sx={{ mt: 3, ml: 1 }}>
                    Atrás
                </Button>
                <Button disabled={loading} type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
                    {loading ?
                        <CircularProgress />
                        :
                        pagar()
                    }
                </Button>
            </Box>
        </form>
    )
};

const PaymentForm = ({ nextStep, backStep }) => {

    // Obtener el state
    const products = useSelector((state) => state.products.basket);

    const priceTotal = () => {
        return products?.reduce((amount, item) => item.price + amount, 0);
    }

    return (
        <React.Fragment>
            <Review />
            <Divider />
            <Typography variant="h6" gutterBottom sx={{ mt: '1rem' }}>
                Método del pago
            </Typography>
            <Elements stripe={stripePromise}>
                <CheckoutForm backStep={backStep} nextStep={nextStep} priceTotal={priceTotal} />
            </Elements>
        </React.Fragment>
    );
}

export default PaymentForm;