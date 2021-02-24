import React, { useState, useEffect, useCallback } from 'react';
import Button from '../button';
import Input from '../input';
//import Button from '../../components/button';

const Breakfast = () => {
  const [menuCafe, setMenuCafe] = useState([]);
  const token = localStorage.getItem('userToken') 

  // const [userCliente, setUserCliente] = useState(''); 
  // const [userMesa, setUserMesa] = useState(''); 
  // const cliente = localStorage.setItem('userCliente', userCliente)
  // const mesa = localStorage.setItem('userMesa', userMesa)
  // const name = localStorage.getItem('userName')

  // const HandleUserCliente = (e) => {
  //   setUserCliente(e.target.value);
  // };

  // const HandleUserMesa = (e) => {
  //   setUserMesa(e.target.value);
  // };

  // const listResume = []
  // const listValue = []

  // const [itemPedido, setItemPedido] = useState([]);

  // const HandleAddPedido = (addProduct) => {
  //   setItemPedido(itemPedido, addProduct);
  // }

  // const HandlePedido = (e) => {
  //   e.preventDefault();
  //   localStorage.getItem('userCliente')
  //   localStorage.getItem('userMesa')
  // }

  const HandleAddPedido = (e) => {
    e.preventDefault()
    const product = e.target.parentNode;
    const idProduct = product.getAttribute('id')
    const nameProduct = product.getAttribute('name')
    const priceProduct = product.getAttribute('price')

    const pedido = {
      id: idProduct,
      name: nameProduct,
      price: priceProduct,
    }

    let resumePedido =[] 

    if (localStorage.hasOwnProperty('resumePedido')) {
      resumePedido = JSON.parse(localStorage.getItem('resumePedido'))
    }
    resumePedido.push({pedido})
    localStorage.setItem('resumePedido', JSON.stringify(resumePedido))

  }


  const [userCliente, setUserCliente] = useState(''); 
  const [userMesa, setUserMesa] = useState(''); 
  const [itemPedido, setItemPedido] = useState([]);
  const [order, setOrder] = useState([])


  const cliente = localStorage.setItem('userCliente', userCliente)
  const mesa = localStorage.setItem('userMesa', userMesa)
  const nameAtendente = localStorage.getItem('userName')
  

  function handleClick(product) {
    console.log(product.id);
    const obj = {
      id: product.id,
      qtd:0,
    }
       
    setOrder((prevState) => [...prevState, obj]);
  }
  
  // setItems(
  //   items.map((item, index) => {
  //     item.id === id ? newItem : item
  //   })
  // )
  const getProducts = useCallback (() => {
            
    fetch('https://lab-api-bq.herokuapp.com/products/', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `${token}`
      },

    })
    .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const getBreakfast = json.filter(item => item.type === 'breakfast')
        setMenuCafe(getBreakfast)
        
      });
    
  }, [token])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <div className='product'>

      <div className='show-input'>
        
        <section>
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
        </section>
      </div>

      <div className='show-product'>      
          {/* className='card-product' key={`product-${product.id}` */}
        {
          menuCafe.map((product) => {
            return (
              <div className='card-product' id={product.id} name={product.name} price={product.price} 
                onClick= {HandleAddPedido}>            
                <p className='white-text'>{product.name}</p> 
                <p className='white-text'>R$ {product.price},00</p> 
                {/* <Button 
                  className='add'
                  name='+'
                  type='submit'
                  onClick= {() => {
                    console.log('clicou produto')
                  }}      
                /> */}
              </div>
            )
          })
          
        } 
      </div>

      <div className='show-resume'>  
      
        <p>RESUMO DO PEDIDO</p>
        <p>Atendente: {nameAtendente}</p>
        <p>Cliente: {userCliente} - Mesa: {userMesa}</p>
        {/* <p> {localStorage.getItem('product.id')} {localStorage.getItem('product.price')} </p>  */}

        {
          itemPedido.map((product) => (

            
              <div className='resume' name={product.name} id={product.id} price={product.price}></div>    
            )
          )
        }  

        <div className='show-total'>
          <p>TOTAL R$ {localStorage.getItem('valueTotal')}</p>
        </div>

        <Button 
          className='button'
          name='Adicionar'
          type='submit'
          onClick= {handleClick}
        />

      </div>     
       
    </div>
  )
}

export default Breakfast;
