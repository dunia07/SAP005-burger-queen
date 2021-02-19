import React, { useState, useEffect, useCallback } from 'react';

const Breakfast = () => {
  const [menuCafe, setMenuCafe] = useState([]);
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
        const getBreakfast = json.filter(item => item.type === 'breakfast')
        setMenuCafe(getBreakfast)
        
      });
    
  }, [token])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <div className='breakfast'>   
      {
        menuCafe.map((product) => {
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

export default Breakfast;
