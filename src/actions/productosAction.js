import { 
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITOSA,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types'

import clienteAxios from '../config/axios'

//crear un nuevo producto - funcion principal que llama a las otras
export function crearNuevoProductoAction(producto){
    return (dispatch) =>{
        dispatch(nuevoProducto())

        //insertar en la API
        clienteAxios.post('/productos', producto)
            .then(res =>{
                console.log(res)
                dispatch(agregarProductoExito(producto))
            })
            .catch(error => {
                console.log(error)
                dispatch(agregarProductoError())
            })
    }
}

export const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTO
})

export const agregarProductoExito = (producto) =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

export const agregarProductoError = (error) => ({
    type: AGREGAR_PRODUCTO_ERROR
})

// funcion principal obtener listado desde la API
export function obtenerProductosAction(){
    return(dispatch)=>{
        dispatch(obtenerProductosComienzo())
        //consultar la api
        clienteAxios.get('/productos')
            .then(res => {
                //console.log(res)
                dispatch(descargaProductosExitosa(res.data))

            })
            .catch(error => {
                //console.log(error)
                dispatch(descargaProductosError())
            })
    }
}

export const obtenerProductosComienzo = ()=> ({
    type: COMENZAR_DESCARGA_PRODUCTOS
})

export const descargaProductosExitosa = (productos)=>({
    type: DESCARGA_PRODUCTOS_EXITOSA,
    payload: productos
})

export const descargaProductosError = () =>({
    type: DESCARGA_PRODUCTOS_ERROR
})

// funcion principal eliminar productos

export function borrarProductoAction(id){
    return (dispatch)=>{
        console.log(id)
        dispatch(obtenerProductoEliminar())
        //eliminar en la api
        clienteAxios.delete(`/productos/${id}`)
            .then( res => {
                console.log(res)
                dispatch(eliminarProductoExito(id))
            })
            .catch(error =>{
                console.log(error)
                dispatch(eliminarProductoError())
            })
    }
}

export const obtenerProductoEliminar = ()=>({
    type: OBTENER_PRODUCTO_ELIMINAR
})

export const eliminarProductoExito = (id)=>({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
})

export const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR
})

// funcion principal, obtener producto a editar
export function obtenerProductoEditarAction(id){
    return (dispatch) =>{
        dispatch(obtenerProducto())

        //obtener producto de la api
        clienteAxios.get(`/productos/${id}`)
            .then(res =>{
                
                dispatch(obtenerProductoEditarExito(res.data))
            })
            .catch(error =>{
                obtenerProductoEditarError()
            })
    }
}

export const obtenerProducto = ()=> ({
    type: OBTENER_PRODUCTO_EDITAR
})

export const obtenerProductoEditarExito=(producto) =>({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})

export const obtenerProductoEditarError = () =>({
    type: PRODUCTO_EDITAR_ERROR,
})


// funcion principal modificar la api y el state con el producto editado

export function editarProductoAction(producto){
    return((dispatch)=>{
        dispatch(comenzarEdicionProducto())

        //consultar api con metodo put
        clienteAxios.put(`/productos/${producto.id}`, producto)
            .then(res =>{
                //console.log(res)
                dispatch(editarProductoExito(res.data))
            })
            .catch(error =>{
                //console.log(error)
                dispatch(editarProductoError())
            })
    })
}

export const comenzarEdicionProducto = () =>({
    type: COMENZAR_EDICION_PRODUCTO
})

export const editarProductoExito = (producto) =>({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

export const editarProductoError = ()=>({
    type: PRODUCTO_EDITADO_ERROR
})