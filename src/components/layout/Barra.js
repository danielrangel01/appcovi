import React from 'react'
import { useAuth } from '../Auth/context/AuthContext';

const Barra = () => {

    const { currentUser, logout, errorUser, setErrorUser} = useAuth()


    const handleLogout = async () => {
        try{
            await logout();
        }catch(error) {
            setErrorUser(true)
        }

        

    }




    return ( 

        <head className="app-header">
            {errorUser ? <p className="error">Error Server</p> : null}
            <p className="nombre-usuario">Hola <span>{currentUser.email}</span></p>

            <nav className="nav-principal nombre-usuario"
            onClick={handleLogout}
            >
                <a href="/">Cerrar Sesion</a>
            </nav>

        </head>
     );
}
 
export default Barra;