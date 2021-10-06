import {
    ADD_BASKET,
    ADD_BASKET_SUCCESS,
    ADD_BASKET_ERROR,
    GET_ITEM_REMOVE,
    ITEM_REMOVE_SUCCESS,
    ITEM_REMOVE_ERROR,
    EMPTY_BASKET
} from '../types';

// Cada reducer tiene su propio state
const initialState = {
    basket: [],
    error: null,
    loading: false,
    removeItem: null
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_BASKET:
            return {
                ...state,
                loading: action.payload
            }

        case ADD_BASKET_SUCCESS:
            return {
                ...state,
                loading: false,
                basket: [...state.basket, action.payload]
            }

        case ADD_BASKET_ERROR:
        case ITEM_REMOVE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                removeItem: null
            }

        case GET_ITEM_REMOVE:
            return {
                ...state,
                removeItem: action.payload
            }

        case ITEM_REMOVE_SUCCESS:
            let newBasket = [...state.basket];
            if ((action.payload >= 0) && (state.basket[action.payload].id === state.removeItem)) {
                newBasket.splice(action.payload, 1);
            } else {
                console.log('Cant remove product');
            }
            return {
                ...state,
                basket: newBasket,
                removeItem: null
            }

        case EMPTY_BASKET:
            return {
                ...state,
                basket: [],
                error: null,
                loading: false,
                removeItem: null
            }

        default:
            return state;
    }
}