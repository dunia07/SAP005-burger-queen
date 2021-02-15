import React from 'react';

function Button ({name, id, className, type, onClick}) {
    return(
        <button
            id={id}
            className={className}
            type={type}
            onClick={onClick}
        >{name}</button>
    )
}

export default Button;
