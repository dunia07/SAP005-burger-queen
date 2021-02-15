import { Link } from 'react-router-dom';

const OrderMenu = () => {
  return (
    <div className='orderMenu'>
      <p>
        <Link to='/ready-orders'>
          <span id='button' className='textRegister'>Pedidos Prontos</span>
        </Link>  
      </p>
      <p>
        <Link to='/finalized-orders'>
          <span id='button' className='textRegister'>Pedidos Finalizados</span>
        </Link>  
      </p>
      <Link to='/'><button type='submit' className='buttonLogout' id='btn-logOut'>Sair</button></Link>
    </div>
  )
    
}

export default OrderMenu;
