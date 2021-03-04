import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../components/button';
import Header from '../../components/header/innerHeader';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer'

const PendingOrders = () => {
  const token = localStorage.getItem('userToken') 
  const [order, setOrder] = useState([])
  const [orderStatus, setOrderStatus] = useState([]);

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
        const order = json.filter(item => item.status === 'pending')
        setOrder(order)
        
      });

  }, [token])

  useEffect(() => {
    getOrders()
  }, [getOrders])

  const readyOrders = (orderId) => {
    console.log(orderId)
    
    fetch(`https://lab-api-bq.herokuapp.com/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST'
      },
      body: JSON.stringify({
        'status': 'Pedido pronto'
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setOrderStatus({...orderStatus, status: 'Pedido pronto'})
      getOrders()
    })
    .catch((error) => console.log('error'))
  }

  return (
    <div className='pending'>
      <Header />
      <Navbar />
      <div className='show-product'> 
        <Button 
          className='button'
          name='Atualizar Pedidos'
          type='submit'
          onClick= {() => {getOrders()}}
        /> 
        {order && order.map (function (product, index) {
          return(
            <div key={`pending-orders-${product.id}`}>
              <span><p>Atendente: {product.user_id}</p></span>
              <span>
                <div>
                  <p>Cliente: {product.client_name}</p>
                  <p>Mesa: {product.table}</p>
                  <p>Pedido Nº: {product.id}</p>
                </div>
                <div>
                  <p>Status: {order === 'pending'} Pedido Pendente</p>
                  <p>Data/Hora: {product.createdAt}</p>
                </div>
                <div>{product.Products.map(function(item) {
                  console.log(item)
                  return(
                    <div key={item.id}>
                      <p>Quant. {item.qtd}</p>
                      <p>Item {item.name} </p>                  
                    </div>                    
                  )})}
                  <Button 
                    className='button'
                    name='Sinalizar como Pronto'
                    type='submit'
                    onClick= {() => {readyOrders(product.id)}}
                  />
                </div>
              </span>
            </div>
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

export default PendingOrders;
