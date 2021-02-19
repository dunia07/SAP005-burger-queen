//import Products from '../products';
import React, { useState, useEffect } from 'react';
//import Button from '../../components/button';

const Breakfast = () => {
  const [menuCafe, setMenuCafe] = useState([]);
  const token = localStorage.getItem('userToken') 
    
  // const handleMenuCafe = (e) => {
  //   setMenuCafe(e.target.value);
  // };

  const getProducts = () => {
            
    fetch('https://lab-api-bq.herokuapp.com/products/', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        //'Content-Type': 'application/x-www-form-urlencoded',
        //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkE3MEBhNzAuY29tIiwiaWQiOjQ1MSwiaWF0IjoxNjEzNDk1ODk0LCJleHAiOjE2NDUwNTM0OTR9.GM9CSsNFLUeCCETYoWTjYJMwcomXvXVGvC2TcE73peE'
        'Authorization': `${token}`
      },
      
    })
    .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const getBreakfast = json.filter(item => item.type === 'breakfast')
        setMenuCafe(getBreakfast)
        
      });
    
  }

  useEffect(() => {
    getProducts()
  }, [])

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
