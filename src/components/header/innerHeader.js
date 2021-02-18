import React from 'react';
import logo2 from '../../image/logo2.png';

function Header () {
    return(
      <header className='inner-header'>
        <img src={logo2} id='inner-logo' className='inner-logo' alt='logo' />
      </header>
    )
}

export default Header;