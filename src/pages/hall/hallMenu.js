import { Link } from 'react-router-dom';

const HallMenu = () => {
  return (
    <div className='pendingOrders'>
      <p>
        <Link to='/HallReady'>
          <span id='button' className='textRegister'>Pedidos Prontos</span>
        </Link>  
      </p>
      <p>
        <Link to='/HallKitchenFinalized'>
          <span id='button' className='textRegister'>Pedidos Finalizados</span>
        </Link>  
      </p>
      <Link to='/'><button type='submit' className='buttonLogout' id='btn-logOut'>Sair</button></Link>
    </div>
  )
    
}

export default HallMenu;
