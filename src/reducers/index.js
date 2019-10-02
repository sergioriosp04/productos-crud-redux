import { combineReducers } from 'redux'
//reducers
import productosReducer from './productosReducer'
import validacionReducer from './validacionReducer'

export default combineReducers({
    productos: productosReducer,
    error: validacionReducer
})