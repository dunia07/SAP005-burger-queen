import React, { useState, useEffect } from 'react';

const Products = () => {
 
  const [listProducts, setListProducts] = useState([]);
  //const userToken = localStorage.getItem('token')
  //const userEmail = localStorage.getItem('email')

  // const handleProducts = (e) => {
  //   setProducts(e.target.value);
  // };
   
  const getProducts = () => {
    //const userToken = localStorage.getItem('token') 
    //const userEmail = localStorage.getItem('email')
    //console.log(userToken, userEmail)
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkE3MEBhNzAuY29tIiwiaWQiOjQ1MSwiaWF0IjoxNjEzNDk1ODk0LCJleHAiOjE2NDUwNTM0OTR9.GM9CSsNFLUeCCETYoWTjYJMwcomXvXVGvC2TcE73peE
        
    fetch('https://lab-api-bq.herokuapp.com/products/', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': `${userToken}`
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkE3MEBhNzAuY29tIiwiaWQiOjQ1MSwiaWF0IjoxNjEzNDk1ODk0LCJleHAiOjE2NDUwNTM0OTR9.GM9CSsNFLUeCCETYoWTjYJMwcomXvXVGvC2TcE73peE'
      
      },
      
    })
    .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setListProducts(json)
        
      });
    
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='products'>
      {
        listProducts.map((product) => {
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

export default Products;
