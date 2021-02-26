import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '../button';
import Input from '../input';

function Navbar() {
  const history = useHistory();

  const handleNavigate = (event, path) => {
    event.preventDefault()
    history.push(path)
  }

  return (
    <div className='navbar'>
      <section className='hall-navbar'>
        <Input
          className='navbar-hall'
          id='order-menu'
          type='radio'
          name='pages'
          value='/order-menu'
          onChange={(event) => handleNavigate(event, event.target.value)}
        />
        <label htmlFor='order-menu'>Menu pedidos</label>
        <Input
          id='ready-orders'
          type='radio'
          name='pages'
          value='/ready-orders'
          onChange={(event) => handleNavigate(event, event.target.value)}
        />
        <label htmlFor='ready-orders'>Pedidos prontos</label>
        <Input
          id='finalized-orders'
          type='radio'
          name='pages'
          value='/finalized-orders'
          onChange={(event) => handleNavigate(event, event.target.value)}
        />
        <label htmlFor='finalized-orders'>Pedidos finalizados</label>
      </section>
    </div>
  )
}

export default Navbar;