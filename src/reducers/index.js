import { combineReducers } from "redux";
import productsReducer from './productsReducer';
import userReducer from "./userReducer";
import shippingDataReducer from "./shippingDataReducer";

export default combineReducers({
    products: productsReducer,
    user: userReducer,
    shippingData: shippingDataReducer
});