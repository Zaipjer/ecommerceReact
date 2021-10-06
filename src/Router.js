import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

// Components
import Navbar from './components/Navbar';
import Products from './components/Products';
import CheckoutPage from './components/CheckoutPage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Checkout from './components/CheckoutForm/Checkout';

// Redux
import { useDispatch } from 'react-redux';
import { colocarUsuarioAction } from './actions/userAction';

const Router = () => {
    // Utilizar useDispatch y te crea una función
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                dispatch(colocarUsuarioAction(user));
            } else {
                // User is signed out
            }
        });
        // eslint-disable-next-line
    }, []);

    return (
        <BrowserRouter>
            <Navbar />

            <Switch>
                <Route exact path='/' component={Products} />
                <Route exact path='/cart' component={CheckoutPage} />
                <Route exact path='/login' component={Signin} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/checkout' component={Checkout}/>
            </Switch>

        </BrowserRouter>
    );
}

export default Router;