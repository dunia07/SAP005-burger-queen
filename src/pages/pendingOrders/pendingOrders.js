import { Link } from 'react-router-dom';

const PendingOrders = () => {
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

export default PendingOrders;
