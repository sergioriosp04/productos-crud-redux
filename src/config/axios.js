import axios from 'axios'

const clienteAxios = axios.create({
    //baseURL: 'http://localhost:4000'
    baseURL: 'https://my-json-server.typicode.com/sergioriosp04/db-json-productos'
})

export default clienteAxios