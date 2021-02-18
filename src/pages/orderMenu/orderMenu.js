import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/innerHeader';
import Footer from '../../components/footer';

const OrderMenu = () => {
  return (
    <Fragment>
      <Header />
      
      <div className='orderMenu'>
        <p>
          <Link to='/ready-orders'>
            <span id='button' className='yellow-text'>Pedidos Prontos</span>
          </Link>  
        </p>
        <p>
          <Link to='/finalized-orders'>
            <span id='button' className='yellow-text'>Pedidos Finalizados</span>
          </Link>  
        </p>
        
      </div>
      <Footer />
    </Fragment>
  )
    
}

export default OrderMenu;
