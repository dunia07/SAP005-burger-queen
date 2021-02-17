import React from 'react';
import { Link } from 'react-router-dom'

function Footer () {
  return (
    <div className='footer'>
      <Footer>
        <label className='yellow-text'>Desenvolvido por</label> 
        <Link to='https://github.com/dunia07'>Dunia Ghazzaoui</Link>
        <Link to='https://github.com/gabrielasilva1991'>Gabriela Silva</Link>
      </Footer>
    </div>
  )
}

export default Footer;
