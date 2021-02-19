//import Products from '../products';
import React, { useState, useEffect } from 'react';
//import Button from '../../components/button';

const Allday = () => {
  const [menuAlmocoJanta, setMenuAlmocoJanta] = useState([]);
  const token = localStorage.getItem('userToken') 
  
  // const handleMenuAlmocoJanta = (e) => {
  //   setMenuAlmocoJanta(e.target.value);
  // };

  // const handleChange = (e) => {
  //   this.setState({value: e.target.value});
  // }

  // const [extras, setExtras] = useState([])

  // const handleExtras = (e) => {
  //   setExtras(e.target.value);
  // };

  const getProducts = () => {
            
    fetch('https://lab-api-bq.herokuapp.com/products/', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkE3MEBhNzAuY29tIiwiaWQiOjQ1MSwiaWF0IjoxNjEzNDk1ODk0LCJleHAiOjE2NDUwNTM0OTR9.GM9CSsNFLUeCCETYoWTjYJMwcomXvXVGvC2TcE73peE'
        'Authorization': `${token}`
      },
      
    })
    .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const getAllday = json.filter(item => item.type === 'all-day')
        setMenuAlmocoJanta(getAllday)
        
      });
    
  }

  useEffect(() => {
    getProducts()
  }, [])
  
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
