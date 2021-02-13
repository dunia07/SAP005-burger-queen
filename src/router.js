import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login/indexLogin';
import Register from './pages/register/indexRegister';
import PendingOrders from './pages/kitchen/pendingOrders';
import HallKitchenFinalized from './pages/common/hallKitchenFinalized'
import HallMenu from './pages/hall/hallMenu'
import HallReady from './pages/hall/hallReady'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path ='/' component={Login} exact />
        <Route path ='/Register' component={Register} exact />
        <Route path ='/PendingOrders' component={PendingOrders} exact />
        <Route path ='/HallKitchenFinalized' component={HallKitchenFinalized} exact />
        <Route path ='/HallMenu' component={HallMenu} exact />
        <Route path ='/HallReady' component={HallReady} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
