import React from 'react';

function Button ({name, id, className, type, onSubmit}) {
    return(
        <button
            id={id}
            className={className}
            type={type}
            onSubmit={onSubmit}
        >{name}</button>
    )
}

export default Button;