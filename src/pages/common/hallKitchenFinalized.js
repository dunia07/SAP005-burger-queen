import { Link } from 'react-router-dom';

const HallKitchenFinalized = () => {
  return (
    <div className='pendingOrders'>
      <p>
        <Link to='/HallMenu'>
          <span id='button' className='textRegister'>Menu Pedidos</span>
        </Link>  
      </p>
      <p>
        <Link to='/HallReady'>
          <span id='button' className='textRegister'>Pedidos Prontos</span>
        </Link>  
      </p>
      <Link to='/'><button type='submit' className='buttonLogout' id='btn-logOut'>Sair</button></Link>
    </div>
  )
}

export default HallKitchenFinalized;
