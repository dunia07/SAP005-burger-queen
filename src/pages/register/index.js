import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from "react-router-dom";
import Button from '../../components/button';
import Input from '../../components/input';
import Header from '../../components/header/outerHeader';
import Footer from '../../components/footer';

const Register = () => {
  const history = useHistory();

  const routerPendingOrders = () => {
    history.push('/pending-orders')
  }

  const routerOrderMenu = () => {
    history.push('/order-menu')
  }

  const [userName, setUserName] = useState(''); 
  const [userEmail, setUserEmail] = useState(''); 
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('')
  const [userJobRole, setUserJobRole] = useState('');

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleUserConfirmPassword = (e) => {
    setUserConfirmPassword(e.target.value);
  };

  const handleUserJobRole = (e) => {
    setUserJobRole(e.target.value);
  };

  const handleButtonRegister = (e) => {
    e.preventDefault();
    fetch('https://lab-api-bq.herokuapp.com/users/', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `email=${userEmail}&password=${userPassword}&role=${userJobRole}&restaurant=LabBurger&name=${userName}`
    })

    .then((response) => response.json())
      .then((json) => {
        console.log(json);

        const token = json.token
        const email = json.email
        const userToken = localStorage.setItem('userToken', token)
        const userEmail = localStorage.setItem('userEmail', email)

        if(userEmail!== null && userToken!== null && json.role === 'cozinha'){
          routerPendingOrders();
        }
        else if(userEmail!== null && userToken!== null && json.role === 'salão'){
          routerOrderMenu();
        }
      })
    
  }

  useEffect(() => {
    console.log('Cadastro efetuado')
  }, []);

  return (
    <div className='App'>
      <Header />
      <Fragment>
        <form>
          <Input
            required
            className='input'
            name='userName'
            type='text'
            placeholder='Digite seu nome'
            value={userName}
            onChange={handleUserName}
          />
          <Input
            required
            className='input'
            name='userEmail'
            type='email'
            placeholder='Digite seu e-mail'
            value={userEmail}
            onChange={handleUserEmail}
          />
          <label className='yellow-text'>Tipo de usuário:</label>
          <section className='inputRadio'>
            <label htmlFor='restaurant-kitchen' >Cozinha
              <Input
                required
                className='setor'
                name='userJobRole'
                id='restaurant-kitchen'
                type='radio'
                value='cozinha'
                onChange={handleUserJobRole}
              />
            </label>
            <label htmlFor='restaurant-hall' >Salão
              <Input
                required
                className='setor'
                name='userJobRole'
                id='restaurant-hall'
                type='radio'
                value='salão'
                onChange={handleUserJobRole}
              />
            </label>
          </section>
          <Input
            required
            className='input'
            name='userPassword'
            type='password'
            placeholder='Insira sua senha'
            value={userPassword}
            onChange={handleUserPassword}
          />
          <Input
            required
            className='input'
            name='userConfirmPassword'
            type='password'
            placeholder='Confirme sua senha'
            value={userConfirmPassword}
            onChange={handleUserConfirmPassword}
          />
          <Button
            className='button'
            name='Cadastrar'
            type='submit'
            onClick={handleButtonRegister}
          />
        </form>
        <Footer />
      </Fragment>
    </div>
  );
}

export default Register;
