import React, { useState } from 'react';
import Header from '../../components/header/innerHeader';
import Breakfast from '../../components/cardapio/breakfast';
import Allday from '../../components/cardapio/allday';
import Navbar from '../../components/navbar/hallNavbar';

const OrderMenu = () => {
  
  const [menuSelect, setMenuSelect] = useState ('Selecione o Menu')

  const HandleMenuSelect = (e) => {
  setMenuSelect(e.target.value);
  };
   
  return (
    <div className='order'>
      <div className='order-menu'>
        <Header />
        <Navbar />
        
        <select className='yellow-text' id='menu' value={menuSelect} onChange= {HandleMenuSelect}>
          <option value='Selecione o Menu' disabled defaultValue>Selecione o Menu</option>
          <option value='Resto do dia'>Almoço/Jantar</option>
          <option value='Café da Manhã'>Café da Manhã</option>
        </select>   
        
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

    </div>  
  )
}

export default OrderMenu;
