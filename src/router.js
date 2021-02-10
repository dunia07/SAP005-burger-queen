import React from 'react';
import { Login } from './pageLogin/indexLogin';
import { Register } from './pageRegister/indexRegister'
import { Switch, Route } from 'react-router-dom';

export const Routes = () => {
    return (
        <Switch>
            <Route path='/' component={Login} exact />
            <Route path='/Register' component={Register} exact />
            <Route component={() => <div>Page 404!</div>} />
        </Switch>

    );
};
