import React, { useState, useEffect, Fragment } from 'react';
import logo from '../../image/logo.png'
// import '../../App.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

import Button from '../../components/button';
import Input from '../../components/input';

const Login = () => {
  const history = useHistory();

  const routerPendingOrders = () => {
    history.push('/pending-orders')
  }

  const routerOrderMenu = () => {
    history.push('/order-menu')
  }

  const [userEmail, setUserEmail] = useState(''); 
  const [userPassword, setUserPassword] = useState('');

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  useEffect(() => {
    console.log('Component App Montado')
  }, []);

  const handleButtonLogin = (e) => {
    e.preventDefault();
    fetch('https://lab-api-bq.herokuapp.com/auth/', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `email=${userEmail}&password=${userPassword}`
    })

    .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if(json.role === "cozinha"){
          routerPendingOrders();
        }
        else if(json.role === "salão"){
          routerOrderMenu();
        }
      })
  }
  
  return (
    <Fragment>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
        </header>
        <form>
          <Input
            required
            className='input'
            name='userEmail'
            type='email'
            // id='email'
            placeholder='Email'
            value={userEmail}
            onChange={handleUserEmail}
          />
          <Input
            required
            className='input'
            name='userPassword'
            type='password'
            placeholder='Insira sua senha'
            value={userPassword}
            onChange={handleUserPassword}
          />
          <Button
            className='button'
            name='Login'
            type='submit'
            onClick={handleButtonLogin}
          />
          <p className='infoText'>Não possui uma conta?</p>
          <p>
            <Link to='/Register' style={{textDecoration: 'none'}}>
              <span id='button' className='yellow-text'>Cadastre-se</span>
            </Link>
          </p>
        </form>
      </div>
    </Fragment>
  );
}

export default Login;
