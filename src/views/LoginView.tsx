import {Link} from 'react-router-dom'
export default function LoginView() {
    return (
        <>
            <div className='text-6xl'>Login view</div>


            <nav>
                <Link to="/auth/register">
                ¿No tienes cuenta? Crea un aqui
                </Link>

            </nav>
        </>
    )
}