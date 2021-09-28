import React,{useState, Fragment} from "react";
import {Link, useHistory} from 'react-router-dom';
import { useAuth } from '../Auth/context/AuthContext';

const Login = () => {

    const {loguin, errorUser, setErrorUser} = useAuth()

    //State de inicio de sesion 
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    const history = useHistory();

    const {email, password} = usuario;

    const onChange = e => {

    guardarUsuario({
        ...usuario,
        [e.target.name] : e.target.value
    })

    };

    // cuando el usuario quiere inicar sesion

    const handleSubmit = async (e) => {
        e.preventDefault()
        
       try{
        await loguin(email, password)
        history.push('/dashboard');
       }catch(error){
        setErrorUser(true)
       }




        /// validar que no haya campos vacios

    }

    return ( 
        <Fragment>

        <h1 className="mt-5">App Coronavirus</h1>

       <div className="form-usuario">
        
           <div className="contenedor-form sombra-dark ">
                <h1>Iniciar Sesion</h1>
                {errorUser ? <p>Correo o contraseña incorrecta </p> : setErrorUser(false)}
                <form
                onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                       <label htmlFor="email">Email</label> 
                       <input type="email"
                       id="email"
                       name="email"
                       placeholder="Tu Email"
                       value={email}
                       onChange={onChange}
                       />
                    </div>

                    <div className="campo-form">
                       <label htmlFor="password">Password</label> 
                       <input type="password"
                       id="password"
                       name="password"
                       placeholder="Tu Password"
                       onChange={onChange}
                       value={password}
                       />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-block btn-primario" value="Iniciar Sesion" />
                    </div>


                </form>

                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    ¿Aun no tienes cuenta?  Registrate Aqui 
                </Link>
           </div>

       </div>

       </Fragment>
     );
}
 
export default Login;
