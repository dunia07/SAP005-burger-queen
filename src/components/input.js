import React from 'react';

function Input ({required, name, className, id, type, value, placeholder, onChange}) {
    return(
        <input
            required={required}
            className={className}
            name={name}
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

export default Input;
