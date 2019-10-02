import React, { useEffect } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { obtenerProductosAction } from '../actions/productosAction'
//components
import Producto from './Producto'


const Productos = () =>{

    // llamar la accion principal para retornar productos
    const dispatch = useDispatch()

    useEffect(()=>{
        //productos cuando el componente este listo
        const cargarProductos = () => dispatch(obtenerProductosAction())
        cargarProductos()
    }, [])

    //acceder al state
    const loading = useSelector(state => state.productos.loading)
    const error = useSelector( state => state.productos.error)
    const productos = useSelector(state => state.productos.productos)


    return(
        <React.Fragment>
            { 
                error  ? 
                <div className="alert alert-danger text-center mt-3"> Hubo un error en la conexion</div>
                : null
            }
                <h2 className="text-center my-5">Listado de Productos</h2>

                <table className="table table-striped">
                    <thead className="bg-primary table-dark">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>   
                    </thead>
                    <tbody>
                        { productos.map(producto =>(
                            <Producto 
                                key={producto.id}
                                producto={producto}
                            />
                        )) }
                    </tbody>
                </table>
                { loading ? 'cargando' : null }
            
        </React.Fragment>
    )
}

export default Productos