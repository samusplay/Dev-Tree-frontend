import { isAxiosError } from "axios"

import api from "../config/axios"
import type { User } from "../types"

export async function getUser() {
    //variable del token

    try {
        //usamos Generic p
        const { data } = await api<User>('/user',)
        //retornamos data
        return data
        //Traer los errores desde el backend
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            //Mostrar mensajes desde el backend
            throw new Error(error.response.data.error)

        }

    }
}

//Debe pasar parametros
export async function updateProfile(formData: User) {
    //variable del token

    try {
        //usamos Generic y poner metodo de api , pasarle los datos
        const { data } = await api.patch<string>('/user', formData)
        //retornamos data
        return data
        //Traer los errores desde el backend
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            //Mostrar mensajes desde el backend
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)

        }

    }
}

export async function uploadImage(file: File) {
    //sr debe poner esta funcion en la mutuacion
    //creamos form data como objeto para que suba el archivo
    let formData = new FormData()
    formData.append('file', file)
    try {
        const {data}=await api.post('/user/image',formData) //pasamos ruta + formData
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            //Mostrar mensajes desde el backend
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)

        }

    }
}

//funcion para obtener el usuario
export async function getUserByHandle(handle:string) {
    //variable del token

    try {
       
        //usamos Generic y poner metodo de api , pasarle los datos
        const { data } = await api(`/${handle}`)
        //retornamos data
        return data
        //Traer los errores desde el backend
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            //Mostrar mensajes desde el backend
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)

        }

    }
}