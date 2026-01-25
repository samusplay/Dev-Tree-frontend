import axios from 'axios'
//Instaciamos un base para construir la solicitud
const api = axios.create({
    //Toma el valor de inicio
    baseURL: import.meta.env.VITE_API_URL
})
//agregamos interceptor con la logica de bearer
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN')
    //para que no siempre envie el jwt
    if(token){
        config.headers.Authorization=`Bearer ${token}`

    }
    return config
})
export default api