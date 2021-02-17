import React, { useState, Fragment, useEffect } from 'react';
import logo from '../../image/logo.png'
//import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Button from '../../components/button';
import Input from '../../components/input';

const OrderMenu = () => {
  const history = useHistory();

  const routerReadyOrders = () => {
    history.push('/ready-orders')
  }

  const routerFinalizedOrders = () => {
    history.push('/finalized-orders')
  }

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

  const [extras, setExtras] = useState('')

  const handleExtras = (e) => {
    setExtras(e.target.value);
  };

  const buttonLogout = (e) => {
    e.preventDefault();
    history.push('/')
  }
  
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    // const tokenLocal  = localStorage.getItem('token');
    // console.log(tokenLocal)
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkE3MEBhNzAuY29tIiwiaWQiOjQ1MSwiaWF0IjoxNjEzNDk1ODk0LCJleHAiOjE2NDUwNTM0OTR9.GM9CSsNFLUeCCETYoWTjYJMwcomXvXVGvC2TcE73peE
        
    fetch('https://lab-api-bq.herokuapp.com/products/', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkE3MEBhNzAuY29tIiwiaWQiOjQ1MSwiaWF0IjoxNjEzNDk1ODk0LCJleHAiOjE2NDUwNTM0OTR9.GM9CSsNFLUeCCETYoWTjYJMwcomXvXVGvC2TcE73peE'
      
      },
      
    })
    .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setProduto(json.products)
        
      });
    
  }, []);

  return (
    <div className='orderMenu'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
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
        <label className='yellow-text'>Selecione o Menu
          {/* <select  onChange={handleChange}>
            <option value={menuCafe}>Café da manhã</option>
            <option value={menuAlmocoJanta}>Almoço/Jantar</option>
          </select> */}
          {/* <input type="submit" value="Enviar" /> */}
        </label>

        {
          
          menuCafe.map((produto, index) => {
            return (
              <p key={index} > {produto.name} {produto.price} </p>
            )
          })
        }    

          {/* const filtrarProdutos = (buscarProdutos, array) => {
            return array.filter(produtos => produtos.type.includes(buscarProdutos));
          }; */}

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
      
    </div>
  )
    
}

export default OrderMenu;
