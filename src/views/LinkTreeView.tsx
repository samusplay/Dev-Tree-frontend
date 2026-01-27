import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { updateProfile } from "../api/DevTreeAPI"

import DevTreeInput from "../components/DevTreeInput"
import { social } from "../data/social"
import type { SocialNetwork, User } from "../types"
import { isValidUrl } from "../utils"


export default function LinkTreeView(){
    const [devTreeLinks,setDevTreeLinks]=useState(social)
    //llamos query client para obtener los datos cachados
    const queryclient=useQueryClient()
     const user:User=queryclient.getQueryData(['user'])!
     //confirmacion 
     console.log(user)

    //mandar llamar los links atravez de una mutuacion
    const {mutate}=useMutation({
        //llamamos la funcion
        mutationFn:updateProfile,
        onError:(error)=>{
            toast.error(error.message)

        },
        onSuccess:()=> {
            toast.success('Actualizado correcatmente')
        },
    })
    //iterar de que redes sociales el usuario ya puso
    useEffect(()=>{
        const updateData=devTreeLinks.map(item=>{
            const userlink=JSON.parse(user.links).find((Link:SocialNetwork)=>Link.name ===item.name)
            if(userlink){
                return {...item, url:userlink.url,enabled:userlink.enabled}
            }
            return item
        })
        //seteamos en el estado
        setDevTreeLinks(updateData)
    }, [])
    

    
    //valor que va cambiar el state de las redes sociales
    const handleUrlChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        //detectar que red social estamo esrcibinedom cumpliendo cierta condicion mantiene referencia
        const updatedLinks=devTreeLinks.map(link=>link.name===e.target.name?{...link,url:e.target.value}
             :link)
        setDevTreeLinks(updatedLinks)
        queryclient.setQueryData(['user'],(prevData:User)=>{
                return{
                    //hacemos una copia de los datos
                    ...prevData,
                    //Cambiamos el tipo de dato a arreglo a string(todo el state)
                    links:JSON.stringify(updatedLinks)
                }

            })
        

    }
    //vooid no retorna nada ponerlo en los types
    const handleEnableLink=(socialNetwork:string)=>{
        //usamos el state para indentificar la red social if a ternario
        const updatedLinks=devTreeLinks.map(link=>{
            
            if(link.name===socialNetwork){
                //validar si la url es valida
                if(isValidUrl(link.url)){
                    return  {...link,enabled:!link.enabled} 

                }else{
                   toast.error('URL no valida') 
                }
            }
            return link            
        } )
            //agregamos al nuevo state
            setDevTreeLinks(updatedLinks)
            //sincronizamos con el usurio cachados
            queryclient.setQueryData(['user'],(prevData:User)=>{
                return{
                    //hacemos una copia de los datos
                    ...prevData,
                    //Cambiamos el tipo de dato a arreglo a string(todo el state)
                    links:JSON.stringify(updatedLinks)
                }

            })
            
    }
    return(
        <div className="space-y-5">
            {devTreeLinks.map(item=>(
                //agregamos el componente con key
                <DevTreeInput 
                key={item.name}
                item={item}
                handleUrlChange={handleUrlChange}
                //pasamos funcion al componente
                handleEnableLink={handleEnableLink}
                />
            ))}
            <button
            className="bg-cyan-400 p-2 text-lg w-full up uppercase text-slate-600 rounded-lg font-bold "
            //realizamos la mutacion y mandamos un call back para que reciba el evento
            onClick={()=>mutate(user)}
            >Guardar Cambios</button>

        </div>
    )
}