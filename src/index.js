import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login/indexLogin';
import Register from './pages/register/indexRegister';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PendingOrders from './pages/kitchen/pendingOrders';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path ='/' component={Login} exact />
      <Route path ='/Register' component={Register} exact />
      <Route path ='/pendingOrders' component={PendingOrders} exact />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
