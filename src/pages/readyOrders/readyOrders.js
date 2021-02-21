import { Link } from 'react-router-dom';
import Header from '../../components/header/innerHeader'
import Navbar from '../../components/navbar/hallNavbar';

const ReadyOrders = () => {
  return (
    <div className='readyOrders'>
      <Header />
      <Navbar />
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
