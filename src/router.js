import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login/index';
import Register from './pages/register/index';
import PendingOrders from './pages/pendingOrders/pendingOrders';
import FinalizedOrders from './pages/finalizedOrders/finalizedOrders'
import OrderMenu from './pages/orderMenu/orderMenu'
import ReadyOrders from './pages/readyOrders/readyOrders'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path ='/' component={Login} exact />
        <Route path ='/register' component={Register} exact />
        <Route path ='/pending-orders' component={PendingOrders} exact />
        <Route path ='/finalized-orders' component={FinalizedOrders} exact />
        <Route path ='/order-menu' component={OrderMenu} exact />
        <Route path ='/ready-orders' component={ReadyOrders} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
