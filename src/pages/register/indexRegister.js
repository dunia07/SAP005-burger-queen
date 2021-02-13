import React, { useState, useEffect } from 'react';
import LogoLabBurger from '../../image/LogoLabBurger.png'
//import '../../App.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [users, setUsers] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  // const [ role, setRole ] = useState('');

  useEffect(() => {
    console.log('Component App Montado')
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setUsers([ ...users, {email, password} ]);
  }
  
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={LogoLabBurger} className='App-logo' alt='logo' />
      </header>

      <form>
        <input type='text' className='input' id='email' value={email} onChange={(event) => setEmail(event.target.value)}/>
        <input type='password' className='input' id='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
        
        <div className='inputRadio'>
          <label for='kitchen'><input id='kitchen' type='radio' className='setor' value='Cozinha'/>Cozinha</label>
          <label for='hall'><input id='hall' type='radio' className='setor' value='Salão'/>Salão</label>
        </div>
       
        <Link to='/PendingOrders' ><button type='submit' className='button' id='btn-login'> Cadastre-se </button></Link> 
      </form>

    </div>
  );
}

export default Register;
