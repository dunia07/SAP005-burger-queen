import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../components/button';
import Header from '../../components/header/innerHeader';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer'

const FinalizedOrders = () => {
  const token = localStorage.getItem('userToken') 
  const [order, setOrder] = useState([])
  
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
        const order = json.filter(item => item.status === 'Pedido entregue')
        setOrder(order)
      });

  }, [token])

  useEffect(() => {
    getOrders()
  }, [getOrders])
    
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
        {order && order.map (function (product, index) {
          return(
            <div className='order-conteiner'>
              <div className='order-sub-conteiner' key={`finalized-orders-${product.id}`}>
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
                  console.log(item)
                  return(
                    <div className='container-order-resume-product' key={item.id}>
                      <p className='product-quant'>{item.qtd}</p>
                      <p className='product-name'>{item.name} </p>                  
                    </div>                    
                  )})}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Footer />
    </>
  )
}

export default FinalizedOrders;
