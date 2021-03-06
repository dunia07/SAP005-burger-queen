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
        const order = result.filter(item => item.status === 'pending')
        setOrder(order)
      });

  }, [token])

  useEffect(() => {
    getOrders()
  }, [getOrders])

  const readyOrders = (orderId) => {
       
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
          const dateHourApi = Date.parse(product.createdAt); 
          const dateConvert = new Date(dateHourApi).toLocaleString();
          return(
            <div className='order-conteiner'>
              <div className='order-sub-conteiner' key={`pending-orders-${product.id}`}>
                <div className='card-orders'>
                    <div className='order-data-init'>
                      {/* <p className='yellow-text waiter-data-resume'>Atendente: {product.user_id}</p> */}
                      <p className='yellow-text waiter-data-resume'>Atendente: {name}</p>
                      <p className='yellow-text order-data-resume'>Pedido Nº: {product.id}</p>
                    </div>
                    <div className='order-data'>
                      <p className='yellow-text order-client'>Cliente: {product.client_name}</p>
                      <p className='yellow-text order-table'>Mesa: {product.table}</p>
                    </div>
                    <div>
                      <p className='yellow-text order-date-hour'>Data/Hora: {dateConvert}</p>
                    </div>
                    <div className='order-data'>
                      <p className='yellow-text order-status'>{order === 'pending'} Pedido Pendente</p>
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
                      name='Sinalizar como Pronto'
                      type='submit'
                      onClick= {() => {readyOrders(product.id)}}
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

export default PendingOrders;
