import React from 'react';

function Footer () {
  return (
    <footer className='footer'>
      <span className='footer-text'> Developed by 
        <a 
          className='link-footer' 
          href='https://github.com/dunia07'
          target='_blank'
          rel='noopener noreferrer'
          > @Dunia Ghazzaoui 
        </a> &amp; 
        <a
          className='link-footer' 
          href='https://github.com/gabrielasilva1991'
          target='_blank'
          rel='noopener noreferrer'
          > @Gabriela Silva
        </a> on 
        <a 
          className='link-footer'
          href='http://laboratoria.la' 
          target="_blank"
          rel='noopener noreferrer'
          > &lt; Laboratoria &gt;
        </a>
      </span>
    </footer>
  )
}

export default Footer;