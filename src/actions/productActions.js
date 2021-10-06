import {
    ADD_BASKET,
    ADD_BASKET_SUCCESS,
    ADD_BASKET_ERROR,
    GET_ITEM_REMOVE,
    ITEM_REMOVE_SUCCESS,
    ITEM_REMOVE_ERROR,
    EMPTY_BASKET
} from '../types';

// Crear nuevo producto
export function agregarCarritoProductoAction(product) {
    return async (dispatch) => {
        dispatch(addProductBasket());

        try {
            dispatch(addProductBasketSuccess(product));
        } catch (error) {
            dispatch(addProductBasketError(true));
        }
    }
}

const addProductBasket = () => ({
    type: ADD_BASKET,
    payload: true
});

// Si el producto se guarda en el basket
const addProductBasketSuccess = (product) => ({
    type: ADD_BASKET_SUCCESS,
    payload: product
});

// Si hubo un error
const addProductBasketError = (state) => ({
    type: ADD_BASKET_ERROR,
    payload: state
});

// Seleccionar y eliminar producto
export function eliminarProductoAction(id, index) {
    return async (dispatch) => {
        dispatch(getProductRemove(id));

        try {
            dispatch(removeItemSuccess(index));
        } catch (error) {
            console.log(error);
            dispatch(removeItemError(true));
        }
    }
}

const getProductRemove = (id) => ({
    type: GET_ITEM_REMOVE,
    payload: id
});

const removeItemSuccess = (index) => ({
    type: ITEM_REMOVE_SUCCESS,
    payload: index
});

const removeItemError = (state) => ({
    type: ITEM_REMOVE_ERROR,
    payload: state
});

// Vaciar el carrito
export function vaciarCarritoProductoAction() {
    return async (dispatch) => {
        dispatch(emptyBasket());
    }
}

const emptyBasket = () => ({
    type: EMPTY_BASKET
});