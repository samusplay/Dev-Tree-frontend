import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateProfile, uploadImage, } from '../api/DevTreeAPI'
import ErrorMessage from '../components/ErrorMessage'
import type { ProfileForm, User } from '../types'

export default function ProfileView() {
    //Usar QueryClient para tomar los datos cacheados en el navegador
    const QueryClient=useQueryClient()
    //pasarle como arreglo la key
    //Gratizamos type srcipt que llega el dato con !
    const data:User=QueryClient.getQueryData(['user'])!
    console.log(data)
   


    //pasrale los valores inciales
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
        //actaulizamos el type para llamar descripciojn
        defaultValues: {
            handle: data.handle,
            description: data.description
        }
    })
    //Usando de TanStackQuery useMutations
    const updateProfileMutation=useMutation({
        //la funcion que va hacer en base a esa mutacion 
        mutationFn:updateProfile,
        //extraemos configuracion
        onError:(error)=>{
            //call back si hubo un error y mostramos con un toast
            toast.error(error.message)
        },
        //pasarle data que se recupera desde la api
        onSuccess:(data)=>{
            toast.success(data)
            //usamos queryclient para eliminar vdatos cahados
            //hacerlo mas dinamico
            QueryClient.invalidateQueries({queryKey:['user']})

        }
    })
    //Segunda Mutuacion para post imagenes
    const uploadImageMutation=useMutation({
        //la funcion que va hacer en base a esa mutacion 
        mutationFn:uploadImage,
        //extraemos configuracion
        onError:(error)=>{
            toast.error(error.message)
        },
        //pasarle data que se recupera desde la api
        onSuccess:(data)=>{
            //optimistic Updates
            //modificar los objetos que estan cachados
             QueryClient.setQueryData(['user'],(prevData:User)=>{
                //para optimizar el envio de la imagen pasa la info actualizada
                return{
                    //recupera lo cachado y lo mantiene
                    ...prevData,
                    image:data.image
                }


             })
        }
    })
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        //subir la informacion
        //validacion si sube la imagen  o no
        if(e.target.files){
            //mandamos llamar la mutuacion cuando cambie la imagen
            uploadImageMutation.mutate(e.target.files[0])
        }
    }

    //Creamos la funcion para el handle submit
    const handleUserProfileForm = (formData:ProfileForm) => {
        //agregamos mutacion 'PATCH'
        updateProfileMutation.mutate(formData)

    }

    return (
        <form
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    //codigo de React
                    {...register('handle', {
                        required: "El nombre de Usuario es obligatorio"
                    })}
                //Los errores los renderizamos atraves del componente 
                />

                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('description', {
                        required: "La descripcion es obligatoria"
                    })}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}