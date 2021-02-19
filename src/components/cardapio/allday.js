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
    <div className='allday'>
      {
        menuAlmocoJanta.map((product)=> {
          return (
            <div key={`product-${product.id}`} > 
              <p>{product.name}</p> 
              <p>{product.price}</p> 
            </div>
          )
        })
      }   
      
    </div>
  )
    
}

export default Allday;
