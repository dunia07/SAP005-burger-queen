import React from 'react';
import logo from '../../image/logo.png';

function Header () {
    return(
      <header>
        <img src={logo} className='logo' alt='logo' />
      </header>
    )
}

export default Header;
