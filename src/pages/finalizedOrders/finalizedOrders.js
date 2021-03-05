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
    <div className='finalized-orders'>
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
            <div  key={`finalized-orders-${product.id}`}>
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
                <div>{product.Products.map(function(item) {
                  console.log(item)
                  return(
                    <div key={item.id}>
                      <p>Quant. {item.qtd}</p>
                      <p>Item {item.name} </p>                  
                    </div>                    
                  )})}
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

export default FinalizedOrders;
