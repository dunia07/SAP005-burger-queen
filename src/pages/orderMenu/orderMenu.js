///import { Link } from 'react-router-dom';
import Header from '../../components/header/innerHeader';
//import Footer from '../../components/footer';
import React, { useState, Fragment } from 'react';
//import logo from '../../image/logo.png'
//import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Products from '../../components/products';
import Button from '../../components/button';
import Input from '../../components/input';


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
  
  const handleUserCliente = (e) => {
    setUserCliente(e.target.value);
  };

  const handleUserMesa = (e) => {
    setUserMesa(e.target.value);
  };

  const [menuCafe, setMenuCafe] = useState([]); 
  const [menuAlmocoJanta, setMenuAlmocoJanta] = useState([]); 
  
  const handleMenuCafe = (e) => {
    setMenuCafe(e.target.value);
  };

  const handleMenuAlmocoJanta = (e) => {
    setMenuAlmocoJanta(e.target.value);
  };

  // const handleChange = (e) => {
  //   this.setState({value: e.target.value});
  // }

  // const [extras, setExtras] = useState([])

  // const handleExtras = (e) => {
  //   setExtras(e.target.value);
  // };

  const buttonLogout = (e) => {
    e.preventDefault();
    history.push('/')
  }
  
  return (
    <div className='orderMenu'>
      <Header />
      
      <Fragment>
        
        <section>
          <Input
            required
            className='input'
            name='userCliente'
            type='text'
            placeholder='Nome do Cliente'
            value={userCliente}
            onChange={handleUserCliente}
          />
          <Input
            required
            className='input'
            name='userMesa'
            type='text'
            placeholder='Número da Mesa'
            value={userMesa}
            onChange={handleUserMesa}
          />
        </section>
        <label className='yellow-text'>Selecione o Menu</label>
        <Button
          className='buttonMenu'
          name='Café da manhã'
          type='submit'
          value={menuCafe}
          onClick={handleMenuCafe}
        />
        <Button
          className='buttonMenu'
          name='Almoco / Janta'
          type='submit'
          value={menuAlmocoJanta}
          onClick={handleMenuAlmocoJanta}
        />
               
        <Button
          className='buttonLogout'
          name='Sair'
          type='submit'
          onClick={buttonLogout}
        />
      </Fragment>
      <Products />
      
    </div>
  )
    
}

export default OrderMenu;
