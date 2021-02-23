import React, { useState } from 'react';
//import { useHistory } from "react-router-dom";
import Header from '../../components/header/innerHeader';
import Button from '../../components/button';
import Input from '../../components/input';
import Breakfast from '../../components/cardapio/breakfast';
import Allday from '../../components/cardapio/allday';

const OrderMenu = () => {
  // const history = useHistory();

  // const routerReadyOrders = () => {
  //   history.push('/ready-orders')
  // }

  // const routerFinalizedOrders = () => {
  //   history.push('/finalized-orders')
  // }


  // const [userCliente, setUserCliente] = useState(''); 
  // const [userMesa, setUserMesa] = useState(''); 
  
  // const HandleUserCliente = (e) => {
  //   setUserCliente(e.target.value);
  // };

  // const HandleUserMesa = (e) => {
  //   setUserMesa(e.target.value);
  // };



  // const handleChange = (e) => {
  //   this.setState({value: e.target.value});
  // }

  // const [extras, setExtras] = useState([])

  // const handleExtras = (e) => {
  //   setExtras(e.target.value);
  // };
 
  const [menuSelect, setMenuSelect] = useState ('Selecione o Menu')

  const HandleMenuSelect = (e) => {
  setMenuSelect(e.target.value);
  };
 
  // const [finishOrder, setFinishOrder] = useState ([])

  // const HandleFinishOrder = (e) => {
  // setFinishOrder(e.target.value);
  // }



  
  const [userCliente, setUserCliente] = useState(''); 
  const [userMesa, setUserMesa] = useState(''); 
  const cliente = sessionStorage.setItem('userCliente', userCliente)
  const mesa = sessionStorage.setItem('userMesa', userMesa)
  const nameAtendente = localStorage.getItem('userName')

  const HandleUserCliente = (e) => {
    setUserCliente(e.target.value);
  };

  const HandleUserMesa = (e) => {
    setUserMesa(e.target.value);
  };
  
  const [itemPedido, setItemPedido] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  const HandleAddPedido = (product) => {
    localStorage.getItem('userName')
    sessionStorage.getItem('userCliente')
    sessionStorage.getItem('userMesa')
    const addProduct = itemPedido
    addProduct.push(product)
    setItemPedido(addProduct);
    HandleSomaValor()
  }
  console.log(itemPedido)
  
 
  const HandleSomaValor = () => {
    itemPedido.forEach(product => {
      const valorInicial = Number(product.price)
      //valorTotal.reduce((valorInicial, valorAdd) => valorInicial + valorAdd, 0)
      setValorTotal(valorInicial + valorTotal)
    }) 
        
    // itemPedido.forEach(item => {
    //   const valor = Number(item.price)
    //   setValorTotal(valor + valorTotal)
    // })
  }

  console.log(HandleSomaValor)

  // const HandlePedido = (e) => {
  //   e.preventDefault();
  //   sessionStorage.getItem('userCliente')
  //   sessionStorage.getItem('userMesa')
  // }



  return (
    <div className='order'>
      <div className='order-menu'>
        <Header />
        <section>
          <Input
            required
            className='input'
            name='userCliente'
            type='text'
            placeholder='Nome do Cliente'
            value={userCliente}
            onChange={HandleUserCliente}
          />
          <Input
            required
            className='input'
            name='userMesa'
            type='text'
            placeholder='Número da Mesa'
            value={userMesa}
            onChange={HandleUserMesa}
          />
        </section>

        <select className='yellow-text' id='menu' value={menuSelect} onChange= {HandleMenuSelect}>
          <option value='Selecione o Menu' disabled defaultValue>Selecione o Menu</option>
          <option value='Resto do dia'>Almoço/Jantar</option>
          <option value='Café da Manhã'>Café da Manhã</option>
        </select>   
        
        <>
          {
            
            (menuSelect === 'Selecione o Menu') ?
            <Allday />
            :
            (menuSelect === 'Resto do dia') ?
            <Allday />
            :
            <Breakfast />
          }
        </>

      </div>

      <div className='order-resume'>  
      
        <p>RESUMO DO PEDIDO</p>

        {
          itemPedido.map((product) => (
              <div className='resume' key={`product-${product.id}`}> 
                <h1>Atendente: {nameAtendente}</h1>
                <h2>Cliente: {userCliente} - Mesa: {userMesa}</h2>
                <p> {localStorage.getItem('product.id')} {localStorage.getItem('product.price')} </p>               
              </div>    
            )
          )
        }  

        {/* <section>
          <Input
            required
            className='input'
            name='userCliente'
            type='text'
            placeholder='Nome do Cliente'
            value={userCliente}
            onChange={HandleUserCliente}
          />
          <Input
            required
            className='input'
            name='userMesa'
            type='text'
            placeholder='Número da Mesa'
            value={userMesa}
            onChange={HandleUserMesa}
          />
        </section> */}

        
        <div className='show-total'>
          <p>TOTAL R$ {localStorage.getItem('valueTotal')}</p>
        </div>

        <Button 
          className='button'
          name='Adicionar'
          type='submit'
          onClick= {(e) => {
            const product = e.target.parentNode.parentNode;
            const idProduct = product.getAttribute('id')
            const nameProduct = product.getAttribute('name')
            const priceProduct = product.getAttribute('price')

            const pedido = {
              id: idProduct,
              name: nameProduct,
              price: priceProduct,
            }
            HandleAddPedido(pedido)
            console.log(HandleAddPedido)
          }}      
        />

      </div>
    </div>  
  )
}

export default OrderMenu;
