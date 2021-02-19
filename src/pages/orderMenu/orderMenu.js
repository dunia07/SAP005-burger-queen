import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Header from '../../components/header/innerHeader';
import Button from '../../components/button';
import Input from '../../components/input';
import Breakfast from '../../components/cardapio/breakfast';
import Allday from '../../components/cardapio/allday';

const OrderMenu = () => {
  const history = useHistory();

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

  const [menuSelect, setMenuSelect] = useState ('Café da Manhã')

  const HandleMenuSelect = (e) => {
    setMenuSelect(e.target.value);
  };

  const buttonLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push('/')
  }
  
  return (
    <div className='orderMenu'>
      <Header />
      <>
        <Button
          className='buttonLogout'
          name='Sair'
          type='submit'
          onClick={buttonLogout}
        />
        <section>
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
            className='input'
            name='userMesa'
            type='text'
            placeholder='Número da Mesa'
            value={userMesa}
            onChange={HandleUserMesa}
          />
        </section>
        <label className='yellow-text'>Selecione o Menu</label>
        <select className='menu' id='menu' value={menuSelect} onChange= {HandleMenuSelect}>
          <option value='Café da Manhã' defaultValue className='selectBreakfast' >Café da Manhã</option>
          <option value='Resto do dia' className='SelectAllday'>Resto do Dia</option>
        </select>   
      </>
     
      <>
      {
        
        (menuSelect === 'Café da Manhã') ?
        <Breakfast />
        :
        <Allday />
      }
      </>
    </div>
  )
}

export default OrderMenu;
