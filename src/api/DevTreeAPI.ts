import { isAxiosError } from "axios"

import api from "../config/axios"
import type { User } from "../types"

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