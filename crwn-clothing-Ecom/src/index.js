import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import { stripePromise } from './utils/stripe/stripe.utils';
import { Elements } from '@stripe/react-stripe-js';
import { store } from './store/store';


const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
