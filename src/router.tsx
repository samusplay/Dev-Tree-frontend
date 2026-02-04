import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import AuthLayout from './layouts/AuthLayout'
import HandleView from './views/HandleView'
import HomeView from './views/HomeView'
import LinkTreeView from './views/LinkTreeView'
import LoginView from './views/LoginView'
import NotFoundView from './views/NotFoundView'
import ProfileView from './views/ProfileView'
import RegisterView from './views/RegisterView'

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                </Route>

                <Route path='/admin' element={<AppLayout />}>
                    <Route index={true} element={<LinkTreeView />} />
                    <Route path='profile' element={<ProfileView />} />
                </Route>

                <Route path='/:handle' element={<AuthLayout />}>
                    <Route element={<HandleView />} index={true} />
                </Route>
                <Route path='/' element={<HomeView />} />

                <Route path='/404' element={<AuthLayout />}>
                    <Route element={<NotFoundView />} index={true} />
                </Route>

            </Routes>
        </BrowserRouter>
        
    )
}