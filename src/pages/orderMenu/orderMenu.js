import React, { useState } from 'react';
import Header from '../../components/header/innerHeader';
import Button from '../../components/button';
//import Input from '../../components/input';
import Breakfast from '../../components/cardapio/breakfast';
import Allday from '../../components/cardapio/allday';
import Navbar from '../../components/navbar/hallNavbar';

const OrderMenu = () => {
  
  const [menuSelect, setMenuSelect] = useState ('Selecione o Menu')

  const HandleMenuSelect = (e) => {
  setMenuSelect(e.target.value);
  };
   


  // //const [menuCafe, setMenuCafe] = useState([]);
  // //const token = localStorage.getItem('userToken') 
  // const nameAtendente = localStorage.getItem('userName')

  // const HandleAddPedido = (e) => {
  //   e.preventDefault()
  //   const product = e.target.parentNode;
  //   const idProduct = product.getAttribute('id')
  //   const nameProduct = product.getAttribute('name')
  //   const priceProduct = product.getAttribute('price')

  //   const pedido = {
  //     id: idProduct,
  //     name: nameProduct,
  //     price: priceProduct,
  //   }

  //   let resumePedido =[] 

  //   // console.log(pedido)

  //   setItemPedido([...itemPedido, pedido])

  //   if (localStorage.hasOwnProperty('resumePedido')) {
  //     resumePedido = JSON.parse(localStorage.getItem('resumePedido'))
  //   }
  //   resumePedido.push({pedido})
  //   localStorage.setItem('resumePedido', JSON.stringify(resumePedido))

  // }

  // const [client, setClient] = useState(''); 
  // const [table, setTable] = useState(''); 
  // const [mesaPedido, setMesaPedido] = useState([{client:'', table:''}])
  // const [itemPedido, setItemPedido] = useState([]);

  // const [order, setOrder] = useState([])

  // console.log(userCliente.client, userMesa.table, order)

  // console.log(itemPedido)

  // const cliente = localStorage.setItem('userCliente', client)
  // const mesa = localStorage.setItem('userMesa', table)
  
  // const handleClick = () => {
  //   setMesaPedido([{client, table}]);
  //   console.log(mesaPedido)
  // }

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

  return (
    <div className='order'>
      <div className='order-menu'>
        <Header />
        <Navbar />
        {/* <section>
          <Input
            required
            className='input'
            name='userCliente'
            type='text'
            placeholder='Nome do Cliente'
            onChange={(e) => setClient (e.target.value)}
          />
          <Input
            required
            className='input'
            name='userMesa'
            type='text'
            placeholder='Número da Mesa'
            onChange={(e) => setTable (e.target.value)}
          />

          <Button 
          className='add'
          name='+'
          type='submit'
          onClick= {(event) => handleClick(event)}
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

      {/* <div className='show-resume'>  
      
        <p>RESUMO DO PEDIDO</p>
        <p>Atendente: {nameAtendente}</p>
        <p>Cliente: {mesaPedido[0].client} Mesa: {mesaPedido[0].table}</p>      

        {itemPedido !== [] && 
          <div>
            <ul>
              {itemPedido.map((product, index) => (
                  <>
                    <li>
                      <label key={index}> {product.name} R$ {product.price},00 </label>
                    </li>
                  </>
                  )
                )
              }
            </ul>
          </div>
        }

        <div className='show-total'>
          <p>TOTAL R$ {localStorage.getItem('valueTotal')}</p>
        </div>

      </div>        */}

      {/* <Button 
        className='button'
        name='Finalizar Pedido'
        type='submit'
        onClick= {() => { }}
      /> */}

    </div>  
  )
}

export default OrderMenu;
