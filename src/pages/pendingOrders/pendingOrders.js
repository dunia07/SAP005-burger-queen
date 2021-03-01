import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const pendingOrders = () => {
  // const token = localStorage.getItem('userToken') 
  // const [order, setOrder] = useState('')

  //  const getOrders = useCallback (() => {
  //   fetch('https://lab-api-bq.herokuapp.com/orders', {
  //     method: 'GET',
  //     headers: {
  //       'accept': 'application/json',
  //       'Authorization': `${token}`,
  //     },
  //   })       
    
  //   .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //       setOrder()
        
  //     });
    
  // }, [token])

  // useEffect(() => {
  //   getOrtders()
  // }, [getOrders])


  return (
    <div className='pendingOrders'>
      <p>
        <Link to='/finalized-orders'>
          <span id='button' className='textRegister'>Pedidos Finalizados</span>
        </Link>  
      </p>
      <Link to='/'><button type='submit' className='buttonLogout' id='btn-logOut'>Sair</button></Link>
    </div>
  )
}

export default pendingOrders;
