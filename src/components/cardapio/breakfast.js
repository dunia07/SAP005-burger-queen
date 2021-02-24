import React, { useState, useEffect, useCallback } from 'react';
import Button from '../button';
import Input from '../input';

const Breakfast = () => {
  const [menuCafe, setMenuCafe] = useState([]);
  const token = localStorage.getItem('userToken') 
  const nameAtendente = localStorage.getItem('userName')

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

    // console.log(pedido)

    setItemPedido([...itemPedido, pedido])

    if (localStorage.hasOwnProperty('resumePedido')) {
      resumePedido = JSON.parse(localStorage.getItem('resumePedido'))
    }
    resumePedido.push({pedido})
    localStorage.setItem('resumePedido', JSON.stringify(resumePedido))

  }

  const [client, setClient] = useState(''); 
  const [table, setTable] = useState(''); 
  const [mesaPedido, setMesaPedido] = useState([{client:'', table:''}])
  const [itemPedido, setItemPedido] = useState([]);
  // const [order, setOrder] = useState([])

  // console.log(userCliente.client, userMesa.table, order)

  console.log(itemPedido)

  const cliente = localStorage.setItem('userCliente', client)
  const mesa = localStorage.setItem('userMesa', table)
  
  const handleClick = () => {
    setMesaPedido([{client, table}]);
    console.log(mesaPedido)
  }
   
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
        </section>
      </div>

      <div className='show-product'>      
        {
          menuCafe.map((product) => {
            return (
              <div className='card-product' key={`product-${product.id}`} id={product.id} name={product.name} price={product.price} 
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

      </div>     
       
    </div>
  )
}

export default Breakfast;
