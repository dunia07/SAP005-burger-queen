import React from 'react';
import { useHistory } from "react-router-dom";
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
          id='pending-orders'
          type='radio'
          name='pages'
          value='/pending-orders'
          onChange={(event) => handleNavigate(event, event.target.value)}
        />
        <label htmlFor='pending-orders'>Pedidos prontos</label>
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