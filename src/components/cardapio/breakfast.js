import React, { useState, useEffect, useCallback } from 'react';
import Button from '../button';
import Input from '../input';
import Lixeira from '../../image/lixeira.png';

const Breakfast = () => {
  const [menuCafe, setMenuCafe] = useState([]);
  const token = localStorage.getItem('userToken') 
  const nameAtendente = localStorage.getItem('userName')

  const [client, setClient] = useState(''); 
  const [table, setTable] = useState(''); 
  const [mesaPedido, setMesaPedido] = useState([{client:'', table:''}])
  const [itemPedido, setItemPedido] = useState([]);
  const [itemValor, setItemValor] = useState(0);

  //const [count, setCount] = useState(itemValor)
  //const [itemQuant, setItemQuant] = useState([]);
  
  //const [order, setOrder] = useState([])
  //const [order, setOrder] = useState({});
 
  // console.log(userCliente.client, userMesa.table, order)

  console.log(itemPedido)
  console.log(client)

  localStorage.setItem('userCliente', client)
  localStorage.setItem('userMesa', table)


  const HandleAddPedido = (e) => {
    e.preventDefault()
    const product = e.target.parentNode;
    const idProduct = product.getAttribute('id')
    const nameProduct = product.getAttribute('name')
    const priceProduct = product.getAttribute('price')
   
    const pedido = {
      client: client,
      table: table, 
      id: idProduct,
      name: nameProduct,
      price: priceProduct,
      qtd: 1
    }

    addPedido(pedido)
      
    setItemValor(itemPedido.reduce((acumulado, product) => acumulado + (product.qtd*Number(product.price)), 0))

    
    
    //let resumePedido =[] 

    // console.log(pedido)

    // setItemPedido([...itemPedido, pedido])
    // setItemQuant([...itemQuant, pedido])
    // HandleSomaValor() 

    // if (localStorage.hasOwnProperty('resumePedido')) {
    //   resumePedido = JSON.parse(localStorage.getItem('resumePedido'))
    // }
    // resumePedido.push({pedido})
    // localStorage.setItem('resumePedido', JSON.stringify(resumePedido))

  }

  const HandleClienteMesa = () => {
    setMesaPedido([{client, table}]);
    limparInput()
    console.log(mesaPedido)
  }
   
  const limparInput = () => {
    const inputs = document.querySelectorAll('input');
    [].map.call(inputs, (entrada) => (entrada.value = ''));
  }

  const addPedido = (product) => {
    const newArray = itemPedido
    newArray.push(product)
    setItemPedido(newArray)
  }

  // const HandleOrder = (e) => {
  //   setOrder({ ...order, client: e.target.value, table: e.target.value, products: itemPedido })
  // };



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


  const sendOrder = () => {
    
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },

      body: JSON.stringify({
        'client': client,
        'table': table, 
        'products': 
          itemPedido.map((product) => (
            {
              'id': Number(product.id),
              'qtd': Number(product.qtd)
            }
          ))
      })
    })
    .then((response) => response.json()
      .then((json) => {
        console.log(json);
        alert('Pedido Criado com Sucesso!');
      })
    )

       
  };
  // [token])

  // useEffect(() => {
  //   sendOrder()
  // }, [sendOrder])

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
          onClick= {(event) => HandleClienteMesa(event)}
          />
        </section>
      </div>

      <div className='show-product'>      
        {
          menuCafe.map((product, index) => {
            return (
              <div className='card-product' disabled={product.qtd && product.qtd != 0}
                key={product.id} 
                id={product.id} 
                name={product.name} 
                price={product.price}
                onClick ={HandleAddPedido}>            
               
                <p className='white-text'>{product.name}</p> 
                <p className='white-text'>R$ {product.price},00</p> 
           
              </div>
            )
          })
          
        } 
      </div>

      <div className='show-resume'>  

        {itemPedido !== [] && 
          <div>
            <section className='titulo-lista-pedido'>
              <p>RESUMO DO PEDIDO</p>
              <p>Atendente: {nameAtendente}</p>
              <p>Cliente: {mesaPedido[0].client} Mesa: {mesaPedido[0].table}</p> 
              <label>Item: </label>
              <label>R$ </label> 
            </section>
            <ul>
              {itemPedido.map((product, index) => (
                  <>
                    <li>
                      <label key={index}> {product.name} R$ {product.price},00 
                      {/* {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price*product.qtd)} */}
                      </label>
                      <input
                        className='input-quantidade'
                        id='aumentar-qtd'
                        type='button'
                        value='+'
                        onClick={() => {
                          if(product.name === itemPedido[index].name) {
                            itemPedido[index].qtd++; 
                            setItemPedido([...itemPedido]);
                            setItemValor(itemPedido.reduce((acumulado, product) => acumulado + (product.qtd*Number(product.price)), 0))
                            
                          }
                        }}
                      />

                      <button>{product.qtd}</button>

                      <input 
                        className='input-quantidade'
                        name='diminuir'
                        type='button'
                        value='-'
                        onClick = {()=> {
                          if(product.qtd > 1 && product.name === itemPedido[index].name) {
                            itemPedido[index].qtd--; 
                            setItemPedido([...itemPedido]);
                            setItemValor(itemPedido.reduce((acumulado, product) => acumulado + (product.qtd*Number(product.price)), 0))
                           
                          } else if(product.name === itemPedido[index].name && product.qtd === 1) {
                            itemPedido.splice(index, 1);
                            setItemPedido([...itemPedido]);
                            setItemValor(itemPedido.reduce((acumulado, product) => acumulado + (product.qtd*Number(product.price)), 0))
                          }  
                        }}
                      />

                      <input
                        className='input-excluir'
                        id='excluir-item'
                        type='image'
                        src={Lixeira}
                        alt='lixeira'
                        onClick={() => {
                          itemPedido.splice(index, 1);
                          setItemPedido([...itemPedido]);
                          setItemValor(itemPedido.reduce((acumulado, product) => acumulado + (product.qtd*Number(product.price)), 0))
                        }}
                      />                
                          
                    </li>
                  </>
                  )
                )
              }
            </ul>
          </div>
        }

        <div className='show-total'>
      
          <p> Total Pedido: R$ {itemValor}</p>

          <Button 
            className='button'
            name='Finalizar Pedido'
            type='submit'
            onClick= {() => {sendOrder()}}
          />     
        </div>

      </div>     
       
    </div>
  )
  
}

export default Breakfast;
