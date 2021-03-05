import React, { useState } from 'react';
import Breakfast from '../../components/cardapio/breakfast';
import Allday from '../../components/cardapio/allday';

import Header from '../../components/header/innerHeader';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer'

const OrderMenu = () => {
  
  const [menuSelect, setMenuSelect] = useState ('Selecione o Menu')

  const HandleMenuSelect = (e) => {
  setMenuSelect(e.target.value);
  };
   
  return (
    <>
    <Header />
    <Navbar />
    <div className='order-menu'>
      <div className='menu-select'>
        <select className='yellow-text' id='menu' value={menuSelect} onChange= {HandleMenuSelect}>
          <option value='Selecione o Menu' disabled defaultValue>Selecione o Menu</option>
          <option value='Resto do dia'>Almoço/Jantar</option>
          <option value='Café da Manhã'>Café da Manhã</option>
        </select>
      </div>
      <>
        {
          (menuSelect === 'Selecione o Menu') ?
          <Allday />
          :
          (menuSelect === 'Resto do dia') ?
          <Allday />
          :
          <Breakfast />
        }
      </>
    </div>
    <Footer />
  </> 
  )
}

export default OrderMenu;
