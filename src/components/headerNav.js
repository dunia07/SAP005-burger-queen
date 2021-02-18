import React, { Fragment } from 'react';
import logo from '../../src/image/logo.png';

function Header () {
  return(
    <Fragment>
      <div>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
        </header>
      </div>

    </Fragment>
  )
}

export default Header;
