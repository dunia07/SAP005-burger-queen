import React, { useState, useEffect, Fragment } from 'react';
import logo from '../../image/logo.png'
// import '../../App.css';
import { Link } from 'react-router-dom';

import Button from '../../components/button';
import Input from '../../components/input';

const Login = () => {

  const [userEmail, setUserEmail] = useState(''); 
  const [userPassword, setUserPassword] = useState('');

  useEffect(() => {
    console.log('Component App Montado')
  }, []);
  
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
              placeholder='Digite seu e-mail'
              value={userEmail}
              onChange={(event) => {
                setUserEmail(event.target.value);
              }
            }
            />
          <Input
              required
              className='input'
              name='userPassword'
              type='password'
              placeholder='Digite sua senha'
              value={userPassword}
              onChange={(event) => {
                setUserPassword(event.target.value);
              }
            }
          />
          <Button
              className='button'
              name='Login'
              type='submit'
              onSubmit={(event) => {
                event.preventDefault();
              }
            }
          />
          <p className='infoText'>Não possui uma conta?</p>
          <p>
            <Link to='/Register'>
              <span id='button' className='yellow-text'>Cadastre-se</span>
            </Link>
          </p>
        </form>
      </div>
    </Fragment>
  );
}

export default Login;
