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
      .then((result) => {
        console.log(result);
        result.sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          } 
          if (a.id < b.id) {
            return - 1;
          }
          return 0
        }).reverse()
        const order = result.filter(item => item.status === 'Pedido pronto')
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
    .then((data) => {
      console.log(data)
      setOrderStatus({...orderStatus, status: 'Pedido entregue'})
      getOrders()
    })
    .catch((error) => console.log('error'))
  }

  const time = (milisegundos) => {
    const minutes = Math.floor(milisegundos / 60000);
    const seconds = ((milisegundos % 60000) / 1000).toFixed(0);
    return (seconds === 60? (minutes + 1) + ": 00": minutes + ":" + (seconds <10? "0": "") + seconds);
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
            const name = localStorage.getItem('userName')
            const dateHourApiInitial = Date.parse(product.createdAt);
            const dateConvert = new Date(dateHourApiInitial).toLocaleString();
            const dateHourApiFinal = Date.parse(product.updatedAt); 
            const timeOrder = time(dateHourApiFinal - dateHourApiInitial )
            return(
              <div className='order-conteiner'>
                <div className='order-sub-conteiner' key={`ready-orders-${product.id}`}>
                  <div className='card-orders'>
                    <div className='order-data-init'>
                      <p className='yellow-text waiter-data-resume'>Atendente: {name}</p>
                      <p className='yellow-text order-data-resume'>Pedido Nº: {product.id}</p>
                    </div>
                    <div className='order-data'>
                      <p className='yellow-text order-client'>Cliente: {product.client_name}</p>
                      <p className='yellow-text order-table'>Mesa: {product.table}</p>
                    </div>
                    <div>
                      <p className='yellow-text order-date-hour'>Data/Hora: {dateConvert}</p>
                      <p className='yellow-text order-date-hour'>Tempo de Preparo: {timeOrder}</p>
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
                    // console.log(item)
                    return(
                      <div className='container-order-resume-product' key={item.id}>
                        <p className='product-quant'>{item.qtd}</p>
                        <p className='product-name'>{item.name} {item.flavor} {item.complement}</p>                  
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
              </div>
            )
          })}
      </div>
      <Footer />
    </>
  )
}

export default ReadyOrders;
