import React, { useState, useEffect, useCallback } from 'react';

const Allday = () => {
  const [menuAlmocoJanta, setMenuAlmocoJanta] = useState([]);
  const token = localStorage.getItem('userToken') 
  
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
        setMenuAlmocoJanta(getAllday)
        
      });
    
  }, [token])

  useEffect(() => {
    getProducts()
  }, [getProducts])
  
  return (
    <div className='product'>
      {
        menuAlmocoJanta.map((product)=> {
          return (
            <div className='card-product' key={`product-${product.id}`} > 
              <p className='white-text'>{product.name}</p> 
              <p className='white-text'>R$ {product.price},00</p> 
            </div>
          )
        })
      }   
      
    </div>
  )
    
}

export default Allday;
