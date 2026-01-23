import { isAxiosError } from "axios"

import api from "../config/axios"
import type { ProfileForm, User } from "../types"

export async function getUser(){
    //variable del token
    
    try{
        //usamos Generic p
          const {data}= await api<User>('/user',)
          //retornamos data
          return data    
        //Traer los errores desde el backend
        }catch(error){
            if(isAxiosError(error)&&error.response){
                //Mostrar mensajes desde el backend
                throw new Error(error.response.data.error)

            }

        }
}

//Debe pasar parametros
export async function updateProfile(formData:ProfileForm){
    //variable del token
    
    try{
        //usamos Generic y poner metodo de api , pasarle los datos
          const {data}= await api.patch<string>('/user',formData)
          //retornamos data
          return data    
        //Traer los errores desde el backend
        }catch(error){
            if(isAxiosError(error)&&error.response){
                //Mostrar mensajes desde el backend
                console.log(error.response.data.error)
                throw new Error(error.response.data.error)

            }

        }
}