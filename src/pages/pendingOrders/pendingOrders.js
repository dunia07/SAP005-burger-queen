import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button';

const PendingOrders = () => {
  const token = localStorage.getItem('userToken') 
  const [order, setOrder] = useState('')

    useEffect(() => {
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
          setOrder(json)
          
        });
    
  }, [])

  return (
    <div className='pending'>
   
      <div className='show-product'>  

        {order && order.map (function (product, index) {
          return(
            <div  key={index}>
              <ul>
                <>
                  <label key={index}></label>
                  <li>Atendente: {product.user_id}</li>
                  <li>Pedido Nº: {product.id}</li>
                  <li>Cliente: {product.client_name}</li>
                  <li>Mesa: {product.table}</li>
                  <li>Status: {product.status}</li>
                  <li>Data/Hora: {product.createdAt}</li>
                  <li>Pedido: {product.Products.map(function(item) {
                      console.log(item)
                      return(
                        <div key={item.id}>
                          <ul>
                          <li>{item.name}</li>
                          <li>{item.qtd}</li>
                          <li>{item.flavor}</li>
                          <li>{item.complement}</li>
                          </ul>
                        </div>
                      )
                    })}
                  
                  </li>
                </>
              </ul>
            </div>
          )

        })
      }

      <div className='sinalizar-pronto'>
           
        <Button 
          className='button'
          name='Sinalizar como Pronto'
          type='submit'
          onClick= {() => {}}
        />     
      </div>
     
      </div>
        <p>
          <Link to='/finalized-orders'>
            <span id='button' className='textRegister'>Pedidos Finalizados</span>
          </Link>  
        </p>
      <Link to='/'><button type='submit' className='buttonLogout' id='btn-logOut'>Sair</button></Link>

    </div>
  )
}

export default PendingOrders;
