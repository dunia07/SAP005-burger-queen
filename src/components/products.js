import React, { useState, Fragment, useEffect } from 'react';
//import Button from '../../components/button';

const Products = ({id, name}) => {
 
  const [products, setProducts] = useState([]);

  const handleProducts = (e) => {
    setProducts(e.target.value);
  };
   
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
        setProducts(json.products)
        
      });
    
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='products'>
      <Fragment>
        {/* {
          products.map((products, index)=> {
            return (
              <p key={id} > {name}</p>
            )
          })
        } */}

        {/* {
          menuCafe.map((produto, index) => {
            return (
              <p key={index} > {produto.name} {produto.price} </p>
            )
          })
        }             */}

        
        {/* {
          menuCafe.push(
            <div key={products}>
                <p>{productsName}</p>
            </div>
          )
        } */}

        {/* <Button
          className='buttonMenu'
          name='Produtos'
          type='submit'
          value={products}
          onClick={handleProducts}
        /> */}

      </Fragment>
      
    </div>
  )
}

export default Products;
