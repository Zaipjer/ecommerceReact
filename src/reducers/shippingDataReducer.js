import {
    SET_SHIPPING_DATA,
    SET_SHIPPING_MESSAGE
} from '../types';

// Cada reducer tiene su propio state
const initialState = {
    shippingData: {},
    message: null
}

export default function shippingDataReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SHIPPING_DATA:
            return {
                ...state,
                shippingData: action.payload
            }

        case SET_SHIPPING_MESSAGE:
            return {
                ...state,
                message: action.payload
            }

        default:
            return state;
    }
}