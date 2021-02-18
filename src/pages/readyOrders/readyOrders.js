import { Link } from 'react-router-dom';

const ReadyOrders = () => {
  return (
    <div className='readyOrders'>
      <p>
        <Link to='/order-menu'>
          <span id='button' className='textRegister'>Menu Pedidos</span>
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

export default ReadyOrders;