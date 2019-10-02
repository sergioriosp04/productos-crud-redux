import React, { useState } from 'react'
//redux
import { crearNuevoProductoAction } from '../actions/productosAction'
import { validarFormularioAction, validacionExito, validacionError } from '../actions/validacioActions'
import { useDispatch, useSelector } from 'react-redux'

const NuevoProducto = ({history}) =>{

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')

    //crear nuevo producto
    const dispatch = useDispatch()
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto))
    const validarFormulario = () => dispatch(validarFormularioAction())
    const exitoValidacion = () => dispatch(validacionExito())
    const errorValidacion = () => dispatch(validacionError())

    // los datos del state
    const error = useSelector((state)=> state.error.error)

    const handleSubmit= e =>{
        e.preventDefault()
        validarFormulario()
        //validar el formulario
        if(nombre.trim() === '' || precio.trim() === ''){
            errorValidacion()
            return
        }
        //si pasa la validacion
        exitoValidacion()
        //crear el nuevo producto
        agregarProducto({
            nombre, precio
        })
        //redireccionar
        history.push('/')

    }

    return(
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold ">Agregar Nuevo Libro</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nombre Libro</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre Libro"
                                    value={nombre}
                                    onChange={ e => setNombre(e.target.value) }
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Libro</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio Libro"
                                    value={precio}
                                    onChange={ e => setPrecio(e.target.value) } 
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar</button>
                        </form>
                        {
                            error ? <div className="alert alert-danger text-center mt-3">Todos los campos son obligatorios</div> : null
                        }
        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoProducto