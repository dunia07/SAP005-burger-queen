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
  const [itemQuant, setItemQuant] = useState([]);


  //const [valorTotal, setValorTotal] = useState([0]);
  //const [order, setOrder] = useState([])

  const [order, setOrder] = useState({});


  // const [precoTotal, setPrecoTotal] = useState([]);
  // const [precosProdutos, setPrecosProdutos] = useState([]);

  // console.log(userCliente.client, userMesa.table, order)

  console.log(itemPedido)

  localStorage.setItem('userCliente', client)
  localStorage.setItem('userMesa', table)


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
    //setPrecosProdutos([...precosProdutos, product.price]);
    //setItemValor([...itemValor, pedido])
    setItemQuant([...itemQuant, pedido])
    // HandleSomaValor() 

    

    if (localStorage.hasOwnProperty('resumePedido')) {
      resumePedido = JSON.parse(localStorage.getItem('resumePedido'))
    }
    resumePedido.push({pedido})
    localStorage.setItem('resumePedido', JSON.stringify(resumePedido))

  }

  const handleClick = () => {
    setMesaPedido([{client, table}]);
    console.log(mesaPedido)
  }
   
  // useEffect (() => {
  //     const soma = itemPedido.reduce((valorAnterior, valorAtual) => valorAnterior + valorAtual.price, 0)
  //      setValorTotal(soma)
  //   }, [itemPedido])
  // }

  const HandleSomaValor = () => {
    //setPrecoTotal(precosProdutos.reduce((total, num) => total + num, 0));
    
    // itemPedido.forEach(product => {
    //   const valorInicial = Number(product.price)
    //   setItemValor(valorInicial.reduce((total, num) => total + num, 0));

    // })

    // const soma = ((valorInicial, valorAdd) => valorInicial + valorAdd);
    // return itemValor.reduce(soma);

    itemPedido.forEach(product => {
      const valorInicial = Number(product.price)
      //valorTotal.reduce((valorInicial, valorAdd) => valorInicial + valorAdd, 0)
      setItemValor(valorInicial + itemValor)
      
    }) 
        
  }

  console.log(setItemValor)



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


  // const HandleAddPedido = (product) => {
  //   setItemPedido([...itemPedido, product]);
  //   setPrecosProdutos([...precosProdutos, product.price]);
  //   const produtoPedido = itemPedido.map((product) => {
  //     return {
  //       id: product.id,
  //       qtd: 1,
  //       name: product.name,
  //       price: product.price,
  //     };
  //   });

  //   const qtd = produtoPedido.reduce(function (r, a) {
  //     r[a.id] = r[a.id] || [];
  //     r[a.id].push(a);
  //     return r;
  //   }, Object.create(null));

  //   const arrayProdutos = [];
  //   for (const [key, value] of Object.entries(qtd)) {
  //     arrayProdutos.push({
  //       id: key,
  //       qtd: value.length,
  //     });
  //   }

  //   setOrder({ ...order, products: arrayProdutos });
  //   alert(product.name + "adicionado!");
  // };


  const handleSubmit = () => {
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      method: "POST",
      headers: {
        'accept': 'application/json',
        // "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        response.json().then((pedido) => {
          console.log(pedido);
          //setOrder({});
          setItemPedido([]);
          //setItemValor([]);
          setItemQuant([]);
          //setPrecoTotal([]);
          //setPrecosProdutos([]);
          // setProdutoExcluído([]);
          clearInput();
          alert("Pedido Criado com Sucesso!");
        });
      })
      .catch(() => {
        alert("Preencha todos os campos!");
      });
  };

  function clearInput() {
    const inputs = document.querySelectorAll("input");
    [].map.call(inputs, (entrada) => (entrada.value = ""));
  }

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
          menuCafe.map((product, index) => {
            return (
              <div className='card-product' key={product.id} id={product.id} name={product.name} price={product.price}
                onClick ={HandleAddPedido}>            
                {/* <Input
                  className='add-btn'
                  id={product.name}
                  type='image'
                  alt='add-button'               
                  onClick={() => {
                      setItemPedido([...itemPedido, {'name': menuCafe[index].name, 'price': menuCafe[index].price}]);
                      setItemValor([...itemValor, menuCafe[index].price]);
                      setItemQuant([...itemQuant, {'id': menuCafe[index].id, 'qtd': 1}]);
                  }}
                /> */}
                
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
            <section className='titulo-lista-pedido'>
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
                          }
                        }}
                      />

                      <label>{product.qtd}</label>

                      <input 
                        className='input-quantidade'
                        name='diminuir'
                        type='button'
                        value='-'
                        onClick = {()=> {
                          if(product.qtd > 1 && product.name === itemPedido[index].name) {
                            itemPedido[index].qtd--; 
                            setItemPedido([...itemPedido]);
                          } else if(product.name === itemPedido[index].name && product.qtd === 1) {
                            itemPedido.splice(index, 1);
                            setItemPedido([...itemPedido]);
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

          <button className="bnt" onClick={() => HandleSomaValor()}>SOMAR</button>

          {/* <h4>R$ {precoTotal},00</h4> */}

          <p>R$ {itemValor}</p>

          <button className="bnt" onClick={() => handleSubmit()}>FINALIZAR</button>
          {/* <p>TOTAL R$ {HandleSomaValor(itemValor)}</p> */}
         
        </div>

      </div>     
       
    </div>
  )
  
}

export default Breakfast;
