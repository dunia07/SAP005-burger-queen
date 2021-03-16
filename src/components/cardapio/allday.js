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
    const flavorProduct = product.getAttribute('flavor')
    const complementProduct = product.getAttribute('complement')

    const pedido = {
      client: client,
      table: table, 
      id: idProduct,
      name: nameProduct,
      price: priceProduct,
      flavor: flavorProduct,
      complement: complementProduct,
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
        // alert('Pedido Criado com Sucesso!');
        setMenuAlmocoJanta(prevMenuAlmocoJanta => {
          return prevMenuAlmocoJanta.map(prevItem=> ({...prevItem, disabled: false }))
        })
      })
    )
  };
  // console.log(itemPedido)
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
              <div key={`allday-item-${product.id}`}>
                <button className='card-product'  
                  id={product.id} 
                  name={product.name} 
                  price={product.price}
                  flavor={product.flavor}
                  complement={product.complement}
                  disabled={product.disabled}
                  onClick ={HandleAddPedido}> 
                  <p className='white-text'>{product.name}</p> 
                  <p className='white-text'>{product.flavor}</p>
                  <p className='white-text'> {product.complement}</p>
                  <p className='white-text'>R$ {product.price},00</p> 
                </button>
              </div>
            )
          })
        }   
      </div>
      <div className='show-resume'>
        {itemPedido !== [] && 
          <div className='resume-container'>
            <section>
              <div id='resume-title'>
                RESUMO DO PEDIDO
              </div>
              <div className='card-resume'>
                <p className='yellow-text waiter-data-resume'> Atendente: {nameAtendente}</p>
                <div className='client-data-resume'>
                  <p className='yellow-text resume-client'> Cliente: {client}</p> 
                  <p className='yellow-text resume-table'> Mesa: {table}</p> 
                </div>
              </div>
              <div className='price-resume'>
                <p className='yellow-text resume-item'> Item: </p>
                <p className='yellow-text resume-price'> R$ </p>
              </div>
            </section>
            <div className='order-resume-container'>
              {itemPedido.map((product, index) => (
                <div className='container-order-resume-product' key={`item-allday-${product.id}` }>
                  <label className='product-name-resume'>{product.name} {product.flavor} {product.complement}</label>
                  <label className='product-price'> R$ {product.price},00 </label>
                  <div className='product-qtd'>              
                    <input 
                      className='input-quantidade'
                      name='diminuir'
                      type='button'
                      value='-'
                      onClick = {()=> {subtraiQtd(product, index)}}
                    />
                    <button className='button-quantidade'>{product.qtd}</button>
                    <input
                      className='input-quantidade'
                      id='aumentar-qtd'
                      type='button'
                      value='+'
                      onClick={() => {addQtd(product, index)}}
                    />
                  </div>
                  <div className='resume-trash'>
                    <input
                      className='input-excluir'
                      id='excluir-item'
                      type='image'
                      src={Lixeira}
                      alt='lixeira'
                      onClick={() => {deleteQtd(product, index)}}
                    /> 
                  </div>                                     
                </div>
              ))}
              
              <div className='show-total'>
                Sub total: R$ {itemValor},00
              </div>
            </div>
            <div className='button-finalized-order'>
              <Button 
                className='button'
                name='Finalizar Pedido'
                type='submit'
                onClick= {() => {sendOrder()}}
              />
            </div> 
          </div>
        }
      </div>   
    </div>
  )
}

export default Allday;
