import React, { useState, useEffect, Fragment } from 'react';
import logo from '../../image/logo.png'
// import '../../App.css';
import { Link } from 'react-router-dom';

import Button from '../../components/button';
import Input from '../../components/input';

const Register = () => {

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState(''); 
  const [userPassword, setUserPassword] = useState('');
  const [userJobRole, setUserJobRole] = useState('');

  useEffect(() => {
    console.log('Component App Montado')
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <Fragment>
        <form>
        <Input
              required
              className='input'
              name='userName'
              type='text'
              placeholder='Digite seu nome'
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }
            }
          />
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
          <label className='yellow-text'>Tipo de usuário:</label>
          <label htmlFor='restaurant-kitchen' className='radio-button'>Cozinha
            <Input
                required
                className='input'
                name='userJobRole'
                id='restaurant-kitchen'
                type='radio'
                value='restaurant-kitchen'
                onChange={(event) => {
                  setUserJobRole(event.target.value)
                }
              }
            />
          </label>
          <label htmlFor='restaurant-hall' className='radio-button'>Salão
            <Input
                required
                className='input'
                name='userJobRole'
                id='restaurant-hall'
                type='radio'
                value='restaurant-hall'
                onChange={(event) => {
                  setUserJobRole(event.target.value)
                }
              }
            />
          </label>
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
              name='Cadastrar'
              type='submit'
              onSubmit={(event) => {
                event.preventDefault();
              }
            }
          />
        </form>
      </Fragment>
    </div>
  );
}

export default Register;
