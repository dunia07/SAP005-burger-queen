import React from 'react';
import logo2 from '../../image/logo2.png';
import Button from '../../components/button';
import { useHistory } from "react-router-dom";


function Header () {
  const history = useHistory();

  const buttonLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push('/')
  }

  return(
    <header 
      className='inner-header'
      >
      <img 
        src={logo2} 
        id='inner-logo' 
        className='inner-logo' 
        alt='logo' 
      />
      
      <Button
        className='button-logout'
        name='Sair'
        type='submit'
        onClick={buttonLogout}
      />
    </header>
  )
}

export default Header;