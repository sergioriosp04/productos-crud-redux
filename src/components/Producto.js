import React from 'react'
import { Link } from 'react-router-dom'
//redux
import { useDispatch } from 'react-redux'
import { borrarProductoAction } from '../actions/productosAction'
//dependencias
import Swal from 'sweetalert2'

const Producto = ({producto}) =>{

    // disparch para ejecutar las acciones
    const dispatch = useDispatch()

    // confirmacion de eliminar producto
    const confirmar = (id)=>{

        // alertas de swal
        Swal.fire({
            title: 'Estas seguro?',
            text: "No puedes devolverlo!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'cancelar'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado.',
                'success'
              )
              dispatch(borrarProductoAction(id))
            }
          })
    }

    return(
        <tr>
            <td>{producto.nombre}</td>
            <td><span className="font-weight-bold">${producto.precio}</span></td>
            <td className="acciones">
                <Link 
                    to={`/productos/editar/${producto.id}`}
                    className="btn btn-primary mr-2"    
                >
                    editar
                </Link>
                <button 
                    className="btn btn-danger"
                    onClick={ ()=> confirmar(producto.id)}
                    >
                    eliminar
                </button>
            </td>
        </tr>
    )
}

export default Producto