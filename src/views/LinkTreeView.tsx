import { useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
export default function LinkTreeView(){
    const [devTreeLinks,setDevTreeLinks]=useState(social)
    
    //valor que va cambiar el state de las redes sociales
    const handleUrlChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        //detectar que red social estamo esrcibinedom cumpliendo cierta condicion mantiene referencia
        const updatedLinks=devTreeLinks.map(link=>link.name===e.target.name?{...link,url:e.target.value}
             :link)
        setDevTreeLinks(updatedLinks)

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
            console.log(updatedLinks)
            //agregamos al nuevo state
            setDevTreeLinks(updatedLinks)
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

        </div>
    )
}