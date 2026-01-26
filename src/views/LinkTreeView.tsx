import { useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
export default function LinkTreeView(){
    const [devTreeLinks,setDevTreeLinks]=useState(social)
    
    //valor que va cambiar el state de las redes sociales
    const handleUrlChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        //detectar que red social estamo esrcibinedom cumpliendo cierta condicion mantiene referencia
        const updatedLinks=devTreeLinks.map(link=>link.name===e.target.name?{...link,url:e.target.value}
             :link)
        //pasamos un arreglo nuevo
        console.log(devTreeLinks)
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
                />
            ))}

        </div>
    )
}