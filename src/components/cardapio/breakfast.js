import Products from '../products';
import React, { useState, Fragment, useEffect } from 'react';
import Button from '../../components/button';

const Breakfast = () => {
  const [menuCafe, setMenuCafe] = useState([]); 
    
  const handleMenuCafe = (e) => {
    setMenuCafe(e.target.value);
  };

  // const handleChange = (e) => {
  //   this.setState({value: e.target.value});
  // }

  const [extras, setExtras] = useState([])

  const handleExtras = (e) => {
    setExtras(e.target.value);
  };

  return (
    <div className='orderMenu'>
        <label className='yellow-text'>Selecione o Menu</label>
        <Button
          className='buttonMenu'
          name='Café da manhã'
          type='submit'
          value={menuCafe}
          onClick={handleMenuCafe}
        />      
    </div>
  )
    
}

export default Breakfast;
