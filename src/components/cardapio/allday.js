import React, { useState, useEffect, useCallback } from 'react';
import Button from '../button';
import Input from '../input';
import Lixeira from '../../image/lixeira.png';

const Allday = () => {
  const token = localStorage.getItem('userToken') 
  const nameAtendente = localStorage.getItem('userName')
  const [menuAlmocoJanta, setMenuAlmocoJanta] = useState([]);
  const [client, setClient] = useState(''); 
  const [table, setTable] = useState(''); 
  const [itemPedido, setItemPedido] = useState([]);
  const [itemValor, setItemValor] = useState(0);
 
  const HandleAddPedido = (e) => {
    e.preventDefault()
    const product = e.target.parentNode;
    const idProduct = Number(product.getAttribute('id'))
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

    setMenuAlmocoJanta(prevMenuCafe => {
      return prevMenuCafe.map(prevItem => prevItem.id === idProduct ? {...prevItem, disabled: true } : prevItem)
    })
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

  const addQtd = (product, index) => {
    if(product.name === itemPedido[index].name) {
      itemPedido[index].qtd++; 
      setItemPedido([...itemPedido]);
      setItemValor(itemPedido.reduce((acumulado, product) => acumulado + (product.qtd*Number(product.price)), 0))
    }
  }

  const subtraiQtd = (product, index) => {
    if(product.qtd > 1 && product.name === itemPedido[index].name) {
      itemPedido[index].qtd--; 
      setItemPedido([...itemPedido]);
      setItemValor(itemPedido.reduce((acumulado, product) => acumulado + (product.qtd*Number(product.price)), 0))
      
    } else if(product.name === itemPedido[index].name && product.qtd === 1) {
      setMenuAlmocoJanta(prevMenuCafe => {
        return prevMenuCafe.map(prevItem=> prevItem.id === product.id ? {...prevItem, disabled: false } : prevItem)
      })
      itemPedido.splice(index, 1);
      setItemPedido([...itemPedido]);
      setItemValor(itemPedido.reduce((acumulado, product) => acumulado + (product.qtd*Number(product.price)), 0))
    }  
  }

  const deleteQtd = (product, index) => {
    setMenuAlmocoJanta(prevMenuCafe => {
      return prevMenuCafe.map(prevItem=> prevItem.id === product.id ? {...prevItem, disabled: false } : prevItem)
    })
    itemPedido.splice(index, 1);
    setItemPedido([...itemPedido]);
    setItemValor(itemPedido.reduce((acumulado, product) => acumulado + (product.qtd*Number(product.price)), 0))
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
        const getAllday = json.filter(item => item.type === 'all-day')
        const itemProduct = json.map(item =>  ({...item, disabled: false}));
        setMenuAlmocoJanta(getAllday, itemProduct)
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
        setItemPedido([]);
        setItemValor([]);
        setClient([]);
        setTable([])
        limparInput()
        alert('Pedido Criado com Sucesso!');
        
      })
    )
  };

  return (
    <div className='product'>
      <div className='show-input'>
        <section>
          <Input
            required
            className='client-data'
            name='userCliente'
            type='text'
            placeholder='  Cliente'
            onChange={(e) => setClient (e.target.value)}
          />
          <Input
            required
            className='table-input'
            name='userMesa'
            type='text'
            placeholder='  Mesa'
            onChange={(e) => setTable (e.target.value)}
          />       
        </section>
      </div>

      <div className='show-product'>
        {
          menuAlmocoJanta.map((product)=> {
            return (
              <button className='card-product' 
                key={product.id} 
                id={product.id} 
                name={product.name} 
                price={product.price}
                disabled={product.disabled}
                onClick ={HandleAddPedido}> 
                <p className='white-text'>{product.name}</p> 
                <p className='white-text'>{product.flavor}</p>
                <p className='white-text'> {product.complement}</p>
                <p className='white-text'>R$ {product.price},00</p> 
              </button>
            )
          })
        }   
      </div>

      <div className='show-resume'>  
        {itemPedido !== [] && 
          <div>
            <section>
              <div id='resume-title'>
                RESUMO DO PEDIDO
              </div>
              <div className='card-resume'>
                <p> Atendente: {nameAtendente}</p>
                <p> Cliente: {mesaPedido[0].client} Mesa: {mesaPedido[0].table}</p> 
                <label> Item: </label>
                <label> R$ </label>
              </div>
            </section>
            <ul>
              {itemPedido.map((product, index) => (
                  <>
                    <li>
                      <label key={index}> {product.name} R$ {product.price},00 </label>                   
                      <input 
                        className='input-quantidade'
                        name='diminuir'
                        type='button'
                        value='-'
                        onClick = {()=> {subtraiQtd(product, index)}}
                      />

                      <button>{product.qtd}</button>

                      <input
                        className='input-quantidade'
                        id='aumentar-qtd'
                        type='button'
                        value='+'
                        onClick={() => {addQtd(product, index)}}
                      />

                      <input
                        className='input-excluir'
                        id='excluir-item'
                        type='image'
                        src={Lixeira}
                        alt='lixeira'
                        onClick={() => {deleteQtd(product, index)}}
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
      
          <p> Total Pedido: R$ {itemValor},00</p>

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

export default Allday;
