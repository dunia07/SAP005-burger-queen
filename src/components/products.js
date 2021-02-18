import React, { useState, Fragment, useEffect } from 'react';

const Products = () => {
 
  const [products, setProducts] = useState([]);

  // const handleProducts = (e) => {
  //   setProducts(e.target.value);
  // };
   
  const getProducts = () => {
    // const tokenLocal  = localStorage.getItem('token');
    // console.log(tokenLocal)
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkE3MEBhNzAuY29tIiwiaWQiOjQ1MSwiaWF0IjoxNjEzNDk1ODk0LCJleHAiOjE2NDUwNTM0OTR9.GM9CSsNFLUeCCETYoWTjYJMwcomXvXVGvC2TcE73peE
        
    fetch('https://lab-api-bq.herokuapp.com/products/', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkE3MEBhNzAuY29tIiwiaWQiOjQ1MSwiaWF0IjoxNjEzNDk1ODk0LCJleHAiOjE2NDUwNTM0OTR9.GM9CSsNFLUeCCETYoWTjYJMwcomXvXVGvC2TcE73peE'
      
      },
      
    })
    .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setProducts(json)
        
      });
    
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='products'>
      <Fragment>
        {
          products.map((product)=> {
            return (
              <div key={`product-${product.id}`} > 
                <p>{product.name}</p> 
                <p>{product.price}</p> 
              </div>
            )
          })
        }       
      </Fragment>
      
    </div>
  )
}

export default Products;
