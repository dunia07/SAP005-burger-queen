import React, { useState } from 'react';
import Header from '../../components/header/innerHeader';
import Button from '../../components/button';
//import Input from '../../components/input';
import Breakfast from '../../components/cardapio/breakfast';
import Allday from '../../components/cardapio/allday';

const OrderMenu = () => {
  
  const [menuSelect, setMenuSelect] = useState ('Selecione o Menu')

  const HandleMenuSelect = (e) => {
  setMenuSelect(e.target.value);
  };
   
  //const [userCliente, setUserCliente] = useState(''); 
  //const [userMesa, setUserMesa] = useState(''); 
  // const cliente = localStorage.setItem('userCliente', userCliente)
  // const mesa = localStorage.setItem('userMesa', userMesa)
  // const nameAtendente = localStorage.getItem('userName')
  // const [order, setOrder] = useState([])
 
 
  //const [itemPedido, setItemPedido] = useState([]);
  //const [valorTotal, setValorTotal] = useState(0);


  // function handleClick(product) {
  //   console.log(product.id);
  //   const obj = {
  //     id: product.id,
  //     qtd:0,
  //   }
       
  //   setOrder((prevState) => [...prevState, obj]);
  // }

  // setItems(
  //   items.map((item, index) => {
  //     item.id === id ? newItem : item
  //   })
  // )




  // const HandleAddPedido = (product) => {
  //   localStorage.getItem('userName')
  //   localStorage.getItem('userCliente')
  //   localStorage.getItem('userMesa')
  //   const addProduct = itemPedido
  //   addProduct.push(product)
  //   setItemPedido(addProduct);
  //   HandleSomaValor()
  // }
  // console.log(itemPedido)
  
  

 
  // const HandleSomaValor = () => {
  //   itemPedido.forEach(product => {
  //     const valorInicial = Number(product.price)
  //     //valorTotal.reduce((valorInicial, valorAdd) => valorInicial + valorAdd, 0)
  //     setValorTotal(valorInicial + valorTotal)
  //   }) 
        
  // }

  // console.log(HandleSomaValor)

  // const HandlePedido = (e) => {
  //   e.preventDefault();
  //   sessionStorage.getItem('userCliente')
  //   sessionStorage.getItem('userMesa')
  // }
  

  


  return (
    <div className='order'>
      <div className='order-menu'>
        <Header />
        {/* <section>
          <Input
            required
            className='input'
            name='userCliente'
            type='text'
            placeholder='Nome do Cliente'
            value={userCliente}
            onChange={(e) => setUserCliente (e.target.value)}
          />
          <Input
            required
            className='input'
            name='userMesa'
            type='text'
            placeholder='Número da Mesa'
            value={userMesa}
            onChange={(e) => setUserMesa (e.target.value)}
          />
        </section> */}

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

      <Button 
        className='button'
        name='Finalizar Pedido'
        type='submit'
        onClick= {() => { }}
      />

    </div>  
  )
}

export default OrderMenu;
