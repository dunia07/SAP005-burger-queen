import React, { useState } from 'react';
//import { useHistory } from "react-router-dom";
import Header from '../../components/header/innerHeader';
//import Button from '../../components/button';
import Input from '../../components/input';
import Breakfast from '../../components/cardapio/breakfast';
import Allday from '../../components/cardapio/allday';
import Navbar from '../../components/navbar/hallNavbar';

const OrderMenu = () => {
  // const history = useHistory();

  // const routerReadyOrders = () => {
  //   history.push('/ready-orders')
  // }

  // const routerFinalizedOrders = () => {
  //   history.push('/finalized-orders')
  // }

  const [userCliente, setUserCliente] = useState(''); 
  const [userMesa, setUserMesa] = useState(''); 
  
  const HandleUserCliente = (e) => {
    setUserCliente(e.target.value);
  };

  const HandleUserMesa = (e) => {
    setUserMesa(e.target.value);
  };

  // const handleChange = (e) => {
  //   this.setState({value: e.target.value});
  // }

  // const [extras, setExtras] = useState([])

  // const handleExtras = (e) => {
  //   setExtras(e.target.value);
  // };
 
  const [menuSelect, setMenuSelect] = useState ('Selecione o Menu')

  const HandleMenuSelect = (e) => {
  setMenuSelect(e.target.value);
  };
 
  return (
    <div className='inner-page-container'>
      <Header />
      <Navbar />
      <>
        <section className='client-data'>
          <Input
            required
            className='input'
            name='userCliente'
            type='text'
            placeholder='Nome do Cliente'
            value={userCliente}
            onChange={HandleUserCliente}
          />
          <Input
            required
            className='table-input'
            name='userMesa'
            type='text'
            placeholder='Número da Mesa'
            value={userMesa}
            onChange={HandleUserMesa}
          />
        </section>
        <div className='select-menu'>
          <select className='filter-select-menu' value={menuSelect} onChange= {HandleMenuSelect}>
            <option value='Selecione o Menu' disabled defaultValue>Selecione o Menu</option>
            <option value='Resto do dia'>Almoço/Jantar</option>
            <option value='Café da Manhã'>Café da Manhã</option>
          </select>
        </div>   
      </>
     
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
  )
}

export default OrderMenu;
