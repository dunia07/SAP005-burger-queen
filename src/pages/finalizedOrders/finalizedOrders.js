import { Link } from 'react-router-dom';

const FinalizedOrders = () => {
  return (
    <div className='finalizedOrders'>
      <p>
        <Link to='/order-menu'>
          <span id='button' className='textRegister'>Menu Pedidos</span>
        </Link>  
      </p>
      <p>
        <Link to='/ready-orders'>
          <span id='button' className='textRegister'>Pedidos Prontos</span>
        </Link>  
      </p>
      <Link to='/'><button type='submit' className='buttonLogout' id='btn-logOut'>Sair</button></Link>
    </div>
  )
}

export default FinalizedOrders;
