import {
    SET_USER
} from '../types';

// Obtener usuario
export function colocarUsuarioAction(user) {
    return (dispatch) => {
        dispatch( setUser(user) )
    }
}

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});
