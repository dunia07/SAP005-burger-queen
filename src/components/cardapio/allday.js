import Products from '../products';
import React, { useState, Fragment, useEffect } from 'react';
import Button from '../../components/button';

const Allday = () => {
  const [menuAlmocoJanta, setMenuAlmocoJanta] = useState([]); 
  
  const handleMenuAlmocoJanta = (e) => {
    setMenuAlmocoJanta(e.target.value);
  };

  // const handleChange = (e) => {
  //   this.setState({value: e.target.value});
  // }

  const [extras, setExtras] = useState([])

  const handleExtras = (e) => {
    setExtras(e.target.value);
  };

  
  return (
    <div className='allday'>
      <label className='yellow-text'>Selecione o Menu</label>
      <Button
        className='buttonMenu'
        name='Almoco / Janta'
        type='submit'
        value={menuAlmocoJanta}
        onClick={handleMenuAlmocoJanta}
      />
    </div>
  )
    
}

export default Allday;
