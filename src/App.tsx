import React from 'react';
import createRoutes from 'src/routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'src/store';
import { ToastContainer } from 'react-toastify';
import theme from 'src/themes';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

/* eslint-disable-next-line */
function App() {
  const { store } = configureStore();

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode="dark" />
        <React.StrictMode>
          <BrowserRouter>
            {createRoutes()}
            <ToastContainer
              position="bottom-right"
              hideProgressBar
              pauseOnHover
              closeButton={false}
              toastStyle={{
                position: 'relative',
                overflow: 'visible',
              }}
            />
          </BrowserRouter>
        </React.StrictMode>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
