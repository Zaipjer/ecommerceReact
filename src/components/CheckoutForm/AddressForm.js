import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AddressInput from './AddressInput';
import { Box } from '@mui/system';

// Redux
import { colocarDireccionAction } from '../../actions/shippingDataAction';
import { useDispatch } from 'react-redux';

const AddressForm = ({ nextStep }) => {

    const methods = useForm();

    // Utilizar useDispatch y te crea una función
    const dispatch = useDispatch();

    // Cuando se agrega al carrito
    const setShippingData = (data) => {
        //Agregar a carrito
        dispatch(colocarDireccionAction(data));
        nextStep();
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Dirección de envío
            </Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(data => { setShippingData(data) })}>
                    <Grid container spacing={3}>
                        <AddressInput required name="firstName" label="Nombre" autoComplete="given-name" sm={6} />
                        <AddressInput required name="lastName" label="Apellido" autoComplete="family-name" sm={6} />
                        <AddressInput required name="city" label="Ciudad" autoComplete="shipping address-level2" sm={12} />
                        <AddressInput required name="street" label="Calle" autoComplete="shipping address-line1" sm={6} />
                        <AddressInput required name="number" label="Número exterior/interior" autoComplete="shipping address-line2" sm={6} />
                        <AddressInput required name="suburb" label="Colonia" autoComplete="shipping address-level3" sm={6} />
                        <AddressInput required name="state" label="Estado" autoComplete="shipping address-level1" sm={6} />
                        <AddressInput required name="zip" label="Código postal" autoComplete="shipping postal-code" sm={6} />
                        <AddressInput required name="country" label="País" autoComplete="shipping country-name" sm={6} />
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <Button component={Link} to="/cart" sx={{ mt: 3, ml: 1 }}>
                            Regresar al carrito
                        </Button>
                        <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
                            Siguiente
                        </Button>
                    </Box>
                </form>
            </FormProvider>
        </React.Fragment>
    );
}

export default AddressForm;