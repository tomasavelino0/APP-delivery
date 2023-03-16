import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login';
import CustomerProducts from './pages/custumerProducts';
import AdmPage from './pages/AdmPage';
import OrdersCustomer from './pages/ordersCustomer';
import OrderPage from './pages/OrderPage';
// import './App.css';
import Register from './pages/Register';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={ LoginPage } />
        <Route path="/register" component={ Register } />
        <Route path="/customer/orders/:id" component={ OrderPage } />
        <Route path="/seller/orders/:id" component={ OrderPage } />
        <Route exact path="/customer/products" component={ CustomerProducts } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/admin/manage" component={ AdmPage } />
        <Route exact path="/customer/orders" component={ OrdersCustomer } />
      </Switch>
    </div>
  );
}

export default App;
