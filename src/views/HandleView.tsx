import { useQuery } from '@tanstack/react-query'
import { Navigate, useParams } from 'react-router-dom'
import { getUserByHandle } from '../api/DevTreeAPI'
import HandleData from '../components/HandleData'
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
    //si esta cargando
    if(isLoading)return <p className='text-center text-white'>Cargando ...</p>
    if(error)return <Navigate to={'/404'}/>
    
    //renderiza los datos
    if(data)return <HandleData data={data} />
}