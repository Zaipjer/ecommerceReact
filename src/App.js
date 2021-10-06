import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';
import Router from './Router';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: red[600],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>

        <Router />

      </Provider>
    </ThemeProvider>
  );
}

export default App;
