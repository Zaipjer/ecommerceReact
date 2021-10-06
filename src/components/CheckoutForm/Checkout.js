import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

const theme = createTheme();

const Checkout = () => {

    // Obtener el state
    const message = useSelector((state) => state.shippingData.message);

    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Dirección de Envío', 'Detalles del Pago'];

    const nextStep = () => {
        setActiveStep((prevActivestep) => prevActivestep + 1);
    }

    const backStep = () => {
        setActiveStep((prevActivestep) => prevActivestep - 1);
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <AddressForm nextStep={nextStep} />;
            case 1:
                return <PaymentForm nextStep={nextStep} backStep={backStep} />;
            default:
                throw new Error('Päso desconocido');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                {message === 'Successful payment' ?
                                    <React.Fragment>
                                        <Typography variant="h5" gutterBottom>
                                            Gracias por su orden.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Su número de pedido es # 2001539. Hemos enviado la
                                            confirmación de su pedido por correo electrónico
                                            y le enviaremos una actualización cuando se haya enviado su pedido.
                                        </Typography>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <Typography variant="h5" gutterBottom>
                                            {message}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Pruebe en otro momento.
                                        </Typography>
                                    </React.Fragment>
                                }
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                    <Button component={Link} to="/" variant="contained" sx={{ mt: 3, ml: 1 }}>
                                        Regresar al inicio
                                    </Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default Checkout;