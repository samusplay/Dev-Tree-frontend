
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

import { getUser } from "../api/DevTreeAPI";
import DevTree from "../components/DevTree";

export default function AppLayout() {
    const { data, isLoading, isError } = useQuery({
        //Funcion que va hacer la consulta
        queryFn: getUser,
        //llave que va identificar la consulta
        queryKey: ['user'],
        retry: 2, // cuantas veces se conecta 
        refetchOnWindowFocus: false //para que cada solictud no mande 

    })
    //poner codigo componente Padre en este caso AppLayout
    if (isLoading) return 'Cargando...'
    if (isError) {
        //no tiene el token debemos mandarlo a otra ruta
        //protege a las otras rutas
        return <Navigate to={'/auth/login'} />
    }
    //pasarle los props de data y renderiza el componente
    
    if(data) return <DevTree data={data} />
        
    
}