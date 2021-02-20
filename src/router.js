import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/login/index';
import Register from './pages/register/index';
import PendingOrders from './pages/pendingOrders/pendingOrders';
import FinalizedOrders from './pages/finalizedOrders/finalizedOrders'
import OrderMenu from './pages/orderMenu/orderMenu'
import ReadyOrders from './pages/readyOrders/readyOrders'

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route
    {...rest}
    render = {props => 
      localStorage.getItem('userToken') ? (
        <Component {...props} />
      ) : (
        <Redirect to= {{ pathname:"/", state: {from: props.location} }}/>
      )
    } 
  />
)

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path ='/' component={Login} exact />
        <Route path ='/register' component={Register} exact />
        <PrivateRoute path ='/pending-orders' component={PendingOrders} exact />
        <PrivateRoute path ='/finalized-orders' component={FinalizedOrders} exact />
        <PrivateRoute path ='/order-menu' component={OrderMenu} exact />
        <PrivateRoute path ='/ready-orders' component={ReadyOrders} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
