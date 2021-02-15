import React from 'react';

function Header ({name, className, id, type, value, onSubmit}) {
    return(
        <header
            id={id}
            type={type}
            className={className}
            value={value}
            onSubmit={onSubmit}
        >{name}</header>
    )
}

export default Header;