import React from 'react';
import { NavLink } from "react-router-dom";

function Navbar() {
  const userRole = localStorage.getItem("userRole");

  return (
    <nav className='navbar'>
      <div className='hall-navbar'>
        {userRole === "salão" ?
          (
            <>
              <NavLink
                className="navbar-link"
                activeClassName="active"
                to="/order-menu"
              >
                Menu pedidos
              </NavLink>

              <NavLink
                className="navbar-link"
                activeClassName="active"
                to="/ready-orders"
              >
                Pedidos prontos
              </NavLink>
            </>
          ) : (
          <>
            <NavLink
              className="navbar-link"
              activeClassName="active"
              to="/pending-orders"
            >
              Pedidos pendentes
            </NavLink>
          </>
          )
        }

        <NavLink
          className="navbar-link"
          activeClassName="active"
          to="/finalized-orders"
        >
          Pedidos finalizados
        </NavLink>

      </div>
    </nav>
  )
}

export default Navbar;
