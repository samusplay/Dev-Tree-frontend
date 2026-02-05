import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";
import type { RegisterForm } from '../types';
export default function RegisterView() {
    //para pasar el handle que el usuario busco
    const location=useLocation()
    const navigate=useNavigate()
    //Objeto para errores
    const initialValues= {
        name: '',
        email: '',
        handle: location?.state?.handle||'',
        password: '',
        password_confirmation: ''

    }
   
    //React Hook from par validar a los inputs
    //Usar Generics
    const { register, watch, reset,handleSubmit, formState: { errors } } = useForm<RegisterForm>({ defaultValues: initialValues })

     //Utilizar watch para confirmar si las contraseñas coinciden escuchar valores
    const password=watch('password')

    //Log para ver la variable de entorno
    
    //funcion interna cuando haga el submit debe ser asincrona
    const handleRegister = async(formData:RegisterForm) => {
        //Funcion para recuperar los datos del backend obtener una respuesta
        //Entramos directamente a data
        try{
            const {data}=await api.post(`/auth/register`,formData)
            //Agregamos Toast y le pasamos data la respuesta
            toast.success(data)
            //reiniciar el formulario
            reset()
            navigate('/auth/login')
        //Traer los errores desde el backend
        }catch(error){
            if(isAxiosError(error)&&error.response){
                //Mostrar mensajes desde el backend
                toast.error(error.response.data.error)

            }

        }
    }

    return (
        <>
            <h1 className='text-4xl text-white font-bold'>Crear Cuenta</h1>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        //para validar el campo 
                        {...register('name', {
                            required: "El nombre es obligatorio"
                        })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('email', {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('handle', {
                            required: "El Handle es obligatorio"
                        })}
                    />
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password', {
                            required: "El Password es obligatorio",
                            minLength:{
                                value:8,
                                message:"El password debe ser minimo de 8 caracteres"
                            }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation', {
                            required: "Repetir Password es obligatorio",
                            //Distintas validaciones en este caso watch
                            validate:(value)=>value===password ||'Los passwords no son iguales'
                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />
            </form>
            <nav className='mt-10'>
                <Link
                    className='text-center text-white text-lg block'
                    to="/auth/login">
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>

            </nav>

        </>
    )
}