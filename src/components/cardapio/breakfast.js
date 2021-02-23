import React, { useState, useEffect, useCallback } from 'react';
//import Button from '../../components/button';
//import Input from '../input';

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
      
      <div className='show-product'>      

        {
          menuCafe.map((product) => {
            return (
              <div className='card-product' key={`product-${product.id}`} >            
                <p className='white-text'>{product.name}</p> 
                <p className='white-text'>R$ {product.price},00</p> 
              </div>
            )
          })
        } 
      </div>

      {/* <div className='show-requests'>
        
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
        </section> */}

        {/* <p>RESUMO DO PEDIDO</p> */}

        { 
          // itemPedido.length !== 0 &&
          // itemPedido.map((product, index) => {

          // listResume.push(product.id)
          // listValue.push(product.price)
           
          // const valueTotal = listValue.reduce((valorInicial, valorAdd) => valorInicial + valorAdd, 0)

          // localStorage.setItem('resume', listResume)
          // localStorage.setItem('value', valueTotal)

          // return (
          //   <div className='requests' key={index} onClick={() => HandleAddPedido(product)} >  
          //     <h1>Atendente: ${name}</h1>
          //     <h2>Cliente: ${cliente} - Mesa: ${mesa}</h2>
          //     <p> {localStorage.getItem('product.id')} {localStorage.getItem('product.price')} </p> 
          //   </div>    
          //   )

          // })

          // itemPedido.map((product) => {
          //   return (
          //     <div className='requests' key={`product-${Math.random()}`} > 
          //       <p className='white-text' key={Math.random()}>{product.name}</p> 
          //       <p className='white-text'>R$ {product.price},00</p> 
          //     </div>    
          //   )
        
          // })
        }
        
        {/* <div className='show-total'>
          <p>TOTAL R$ {localStorage.getItem('valueTotal')}</p>
        </div> */}

        {/* <Button 
          className='button'
          name='Adicionar'
          type='submit'
          onClick={(event) => HandleAddPedido(event)}       
        /> */}

        {/* <Button
          className='button'
          name='Adicionar'
          type='submit'
          onClick={(e) => {
            const product = e.target.parentNode;
            const idProduct = product.getAttribute('id')
            const nameProduct = product.getAttribute('name')
            const priceProduct = product.getAttribute('price')

            const pedido = {
              id: idProduct,
              name: nameProduct,
              price: priceProduct,
            }
            HandlePedido(pedido)
            console.log(HandlePedido)
          }}
        /> */}

      {/* </div> */}
    </div>
  )
}

export default Breakfast;
