import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/categories.context';
import { CartProvider } from './contexts/cart.context';

import { stripePromise } from './utils/stripe/stripe.utils';
import { Elements } from '@stripe/react-stripe-js';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <CategoriesProvider>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </CartProvider>
      </CategoriesProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
