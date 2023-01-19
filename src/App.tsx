import React from 'react';
import createRoutes from 'src/routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'src/store';
import { ToastContainer } from 'react-toastify';

/* eslint-disable-next-line */
function App() {
  const { store } = configureStore();

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
