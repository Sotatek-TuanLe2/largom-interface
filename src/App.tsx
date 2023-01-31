import React from 'react';
import createRoutes from 'src/routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'src/store';
import { ToastContainer } from 'react-toastify';
import theme from 'src/themes';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { I18nextProvider } from 'react-i18next';
import { initI18n } from 'src/utils/i18n';
import i18next from 'i18next';

// initiate multi-language
initI18n().then();

/* eslint-disable-next-line */
function App() {
  const { store } = configureStore();

  return (
    <I18nextProvider i18n={i18next}>
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
    </I18nextProvider>
  );
}

export default App;
