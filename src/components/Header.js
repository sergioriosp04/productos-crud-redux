import React from 'react'
import { Link } from 'react-router-dom'

const Header = () =>{
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <h1>
                <Link to={"/"} className="text-light">
                    Crud-React, Redux Hooks, rest API
                </Link>
            </h1>
            <Link to={"/productos/nuevo"} className="btn btn-danger">
                Agregar Producto &#43;
            </Link>
        </nav>
    )
}

export default Header