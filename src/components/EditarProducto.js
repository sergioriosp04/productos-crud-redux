import React, {useEffect, useState, useRef } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { obtenerProductoEditarAction, editarProductoAction } from '../actions/productosAction'
import { validarFormularioAction, validacionExito, validacionError } from '../actions/validacioActions'
//dependencias
import Swal from 'sweetalert2'


const EditarProducto = ({match, history}) =>{

    //State del componete con ref
    const nombreRef = useRef('')
    const precioRef = useRef('')


    //dispatch para ejecutar la accion principal
    const dispatch = useDispatch()
    
    const editarProducto = (producto) => dispatch(editarProductoAction(producto))
    const validarFormulario = () => dispatch(validarFormularioAction())
    const exitoValidacion = () => dispatch(validacionExito())
    const errorValidacion = () => dispatch(validacionError())
    //obtener el id de las props de react
    const {id} = match.params
    
    useEffect(()=>{
        dispatch(obtenerProductoEditarAction(id))
    }, [id, dispatch])
    
    //acceder al state global
    const producto = useSelector(state => state.productos.producto)
    const error = useSelector(state => state.productos.error)
    
    //cuando carga la api
    if(!producto) return 'cargando...'
    
    const handleSubmit = e =>{
        e.preventDefault()

        //validar
        validarFormulario()
        if(nombreRef.current.value.trim() === '' || precioRef.current.value.trim() === ''){
            errorValidacion()
            return
        }
        //no hay error
        exitoValidacion()
        //guardar cambios
        editarProducto({
            id,
            nombre: nombreRef.current.value,
            precio: precioRef.current.value
        })
        Swal.fire(
            'Almacenado!',
            'Has editado un producto!',
            'success'
          )
        //redireccionar
        history.push('/')
    }

    return(
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">Editar Producto</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Titulo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Titulo"
                                    defaultValue ={producto.nombre}
                                    ref={nombreRef}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio"
                                    defaultValue={producto.precio}
                                    ref={precioRef}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
                        </form>
                        {error ? <div className="alert alert-danger mt-2">error al conectar con el servidor</div> : null}
 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarProducto