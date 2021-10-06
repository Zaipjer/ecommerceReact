import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

// Redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { vaciarCarritoProductoAction } from '../actions/productActions';
import { colocarUsuarioAction } from '../actions/userAction';

export default function Navbar() {

    // Obtener el state
    const products = useSelector((state) => state.products.basket);
    const user = useSelector((state) => state.user.user);

    // Utilizar useDispatch y te crea una función
    const dispatch = useDispatch();

    const handleAuth = () => {
        if (user) {
            signOut(auth).then(() => {
                dispatch(vaciarCarritoProductoAction());
                dispatch(colocarUsuarioAction(null));
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    return (
        <Box sx={{ flexGrow: 1, marginTop: '7rem' }}>
            <AppBar position="fixed" sx={{ backgroundColor: 'whitesmoke', boxShadow: "none" }}>
                <Toolbar>
                    <Link to='/'>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <img src={Logo} alt="Logo" style={{ marginRight: '10px', height: '2.5rem' }} />
                        </IconButton>
                    </Link>
                    <div style={{ flexGrow: 1 }} />
                    <Typography variant="h6" color="text.primary" component="p">
                        Hola {user ? user.email : 'Invitado'}
                    </Typography>
                    <div style={{ marginLeft: "16px" }}>
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            <Button variant="contained" onClick={handleAuth} sx={{ pt: '4px', pb: '3px', fontSize: '1rem', textTransform: 'none' }}>
                                {user ? "Cerrar sesión" : "Iniciar sesión"}
                            </Button>
                        </Link>
                        <Link to='/cart'>
                            <IconButton arial-label="show cart items" color="inherit">
                                <Badge badgeContent={products.length} color="secondary">
                                    <ShoppingCartIcon fontSize="large" color="primary" />
                                </Badge>
                            </IconButton>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
