import React, { useState, useEffect } from 'react';
import LogoLabBurger from '../../image/LogoLabBurger.png'
import '../../App.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [users, setUsers] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [ role, setRole ] = useState('');

  useEffect(() => {
    console.log('Component App Montado')
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setUsers([ ...users, {email, password} ]);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={LogoLabBurger} className="App-logo" alt="logo" />
      </header>

      {/* {
        users.map((user, index) => (
          <User
            key={index}
            email={user.email}
            senha={user.password}
          />
        ))
      } */}

      <form>
        <input type='text' className='input' id='email' value={email} onChange={(event) => setEmail(event.target.value)}/>
        <input type='password' className='input' id='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
        <select value={role} onChange={(event) => setRole(event.target.value)}>
	      <option>Tipo de usuário</option>
		  <option value="role">Cozinha</option>
		  <option value="role">Salão</option>
	    </select>
        <button type='submit' className='button' id='btn-login'><Link to='/pendingOrders'>Cadastre-se</Link></button>    
      </form>

    </div>
  );
}

export default Register;
