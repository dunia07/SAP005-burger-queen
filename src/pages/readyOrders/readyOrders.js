import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button';

import Header from '../../components/header/innerHeader'


const ReadyOrders = () => {
  const token = localStorage.getItem('userToken') 
  const [order, setOrder] = useState([])
  const [orderStatus, setOrderStatus] = useState([{status: 'Pedido pronto'}]);

  const getOrders = useCallback (() => {
    
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `${token}`,
      },
    })       
    
    .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const order = json.filter(item => item.status === 'Pedido pronto')
        setOrder(order)
        
      });
    
  }, [token])

  useEffect(() => {
    getOrders()
  }, [getOrders])

  const finalizedOrders = (productId) => {
    
    fetch(`https://lab-api-bq.herokuapp.com/orders/${productId}`, {
      method: 'PUT',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({
          'status': 'Pedido entregue'
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      setOrderStatus({...orderStatus, status: 'Pedido entregue'})
    })
  }
  
  return (
    <div className='readyOrders'>
      <Header />
      
      <div className='show-product'>  

        {order && order.map (function (product, index) {
          return(
            <div  key={index}>
            
              <span><p>Atendente: {product.user_id}</p></span>
              <span>
                <div>
                  <p>Cliente: {product.client_name}</p>
                  <p>Mesa: {product.table}</p>
                  <p>Pedido Nº: {product.id}</p>
                </div>
                <div>
                  <p>Status: {product.status}</p>
                  <p>Data/Hora: {product.createdAt}</p>
                </div>
                <p>{product.Products.map(function(item) {
                  console.log(item)
                  return(
                    <div key={item.id}>
                      <p>Quant. {item.qtd}</p>
                      <p>Item {item.name} </p>                  
                    </div>                    
                  )})}
                  <Button 
                    className='button'
                    name='Entregar pedido'
                    type='submit'
                    onClick= {() => {finalizedOrders(product.id)}}
                  />
                </p>
              </span>
            </div>
          )
        })}

      </div>

      <p>
        <Link to='/order-menu'>
          <span id='button' className='textRegister'>Menu Pedidos</span>
        </Link>  
      </p>
      <p>
        <Link to='/finalized-orders'>
          <span id='button' className='textRegister'>Pedidos Finalizados</span>
        </Link>  
      </p>
      <Link to='/'><button type='submit' className='buttonLogout' id='btn-logOut'>Sair</button></Link>

    </div>
  )
}

export default ReadyOrders;
