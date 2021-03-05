import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../components/button';
import Header from '../../components/header/innerHeader'
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer'

const ReadyOrders = () => {
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
        const order = json.filter(item => item.status === 'Pedido pronto')
        setOrder(order)
        
      });

  }, [token])

  useEffect(() => {
    getOrders()
  }, [getOrders])

  const finalizedOrders = (orderId) => {
    
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
        'status': 'Pedido entregue'
      })
    })
    .then((response) => response.json())
    .then(() => {
      setOrderStatus({...orderStatus, status: 'Pedido entregue'})
      getOrders()
    })
  }
  
  return (
    <>
      <Header />
      <Navbar />
      <div className='refresh-orders'>
        <Button 
          className='button-refresh'
          name='Atualizar Pedidos'
          type='submit'
          onClick= {() => {getOrders()}}
        /> 
      </div>
      <div className='show-orders'>
          {order && order.map (function (product) {
            return(
              <div className='order-conteiner' key={`ready-orders-${product.id}`}>
                <div className='card-orders'>
                  <div className='order-data'>
                    <p className='yellow-text waiter-data-resume'>Atendente ID: {product.user_id}</p>
                    <p className='yellow-text order-data-resume'>Pedido Nº: {product.id}</p>
                  </div>
                  <div className='order-data'>
                    <p className='yellow-text order-client'>Cliente: {product.client_name}</p>
                    <p className='yellow-text order-table'>Mesa: {product.table}</p>
                  </div>
                  <div>
                    <p className='yellow-text order-date-hour'>Data/Hora: {product.createdAt}</p>
                  </div>
                  <div className='order-data'>
                    <p className='yellow-text order-status'>{product.status}</p>
                  </div>
                </div>
                <div className='order-title'>
                  <p className='yellow-text order-quant'> Quant. </p>
                  <p className='yellow-text order-item'> Item </p>
                </div>
                <div className='order-product-container'>{product.Products.map(function(item) {
                  return(
                    <div className='container-order-resume-product' key={item.id}>
                      <p className='product-quant'>{item.qtd}</p>
                      <p className='product-name'>{item.name} </p>                  
                    </div>                    
                  )})}
                </div>
                <div className='button-finalized-order'>
                  <Button 
                    className='button'
                    name='Entregar pedido'
                    type='submit'
                    onClick= {() => {finalizedOrders(product.id)}}
                  />
                </div>
              </div>
            )
          })}
      </div>
      <Footer />
    </>
  )
}

export default ReadyOrders;
