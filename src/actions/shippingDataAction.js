import {
    SET_SHIPPING_DATA, SET_SHIPPING_MESSAGE
} from '../types';

// Obtener usuario
export function colocarDireccionAction(address) {
    return (dispatch) => {
        dispatch(setShipping(address))
    }
}

const setShipping = (address) => ({
    type: SET_SHIPPING_DATA,
    payload: address
});

export function colocarMensajeAction(message) {
    return (dispatch) => {
        dispatch(setMessage(message))
    }
}

const setMessage = (message) => ({
    type: SET_SHIPPING_MESSAGE,
    payload: message
});