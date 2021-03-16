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
        const order = result.filter(item => item.status === 'Pedido entregue')
        setOrder(order)
      });

  }, [token])

  useEffect(() => {
    getOrders()
  }, [getOrders])

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

          const dateHourApiFinished = Date.parse(product.processedAt); 
          const timeFinished = time(dateHourApiFinished - dateHourApiInitial )

          const dateHourApiDelivery = Date.parse(product.updatedAt); 
          const timeDelivery = time(dateHourApiDelivery - dateHourApiFinished )

          const dateHourApiFinal = Date.parse(product.updatedAt); 
          const timeOrder = time(dateHourApiFinal - dateHourApiInitial )

          return(
            <div className='order-conteiner'>
              <div className='order-sub-conteiner' key={`finalized-orders-${product.id}`}>
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
                    <div className= 'order-data'>
                      <p className='yellow-text order-date-hour'>Data/Hora: {dateConvert}</p>
                    </div>
                    <p className='yellow-text order-date-hour'>Tempo de Preparo: {timeFinished}</p>
                    <p className='yellow-text order-date-hour'>Tempo de Entrega: {timeDelivery}</p>
                    <p className='yellow-text order-date-hour'>Tempo de Total: {timeOrder}</p>
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
