import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getUserByHandle } from '../api/DevTreeAPI'
export default function HandleView(){

    const params=useParams()
    const handle=params.handle!
    //llamamos la funcion y extraemos valores
    const {data,error,isLoading}=useQuery({
        queryFn:()=>getUserByHandle(handle),
        //llave para indetificarlo
        queryKey:['handle',handle],
        retry:1
    })
    console.log(isLoading)
    console.log(error)
     console.log(data)
    
    return(
        <div>Hola</div>
    )
}