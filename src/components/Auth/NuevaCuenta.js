import React,{useState,Fragment} from "react";
import {Link,useHistory} from 'react-router-dom';
import { useAuth } from '../Auth/context/AuthContext';


const NuevaCuenta = () => {

    const {signup} = useAuth()
    const [error, setError ] = useState(null);
    //State de inicio de sesion 
    const [usuario, guardarUsuario] = useState({
        nombre:'',
        email: '',
        password: '',
        confirmar: ''
    });



    const history = useHistory();


    const {nombre, email, password, confirmar} = usuario;

    const onChange = e => {

    guardarUsuario({
        ...usuario,
        [e.target.name] : e.target.value
    })

    };

    // cuando el usuario quiere inicar sesion

    const onSubmit = async e => {
        e.preventDefault();
     
        

        if(password !== confirmar) {
          
            setError('Las Contraseñas no coiciden')
            setTimeout(() => setError(''), 1500 )
          

        }else{

            try{
                await signup(email, password)
              
                history.push('/dashboard');
                
               }catch(error){
                
                setError('Erro al registar, Intente Nuevamente')
                setTimeout(() => setError(''), 1500 )
               }


        }
        /// validar que no haya campos vacios
        

        // pasword minimo 6 caracteres


        // los 2 pasword son iguales


        // pasarla al action 
    }

    return ( 
        <Fragment>

             <h1 className="mt-5">App Coronavirus</h1>
       <div className="form-usuario">
           <div className="contenedor-form sombra-dark">
               {error && <p className="error">{error}</p>}
                <h1>Crea Una Cuenta</h1>

                <form
                onSubmit={onSubmit}
                >
                    <div className="campo-form">
                       <label htmlFor="email">Nombre</label> 
                       <input type="text"
                       id="nombre"
                       name="nombre"
                       placeholder="Tu Nombre"
                       value={nombre}
                       onChange={onChange}
                       />
                    </div>


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
                       <label htmlFor="confirmar">Confirmar Password</label> 
                       <input type="password"
                       id="confirmar"
                       name="confirmar"
                       placeholder="Repite Tu Password"
                       onChange={onChange}
                       value={confirmar}
                       />
                    </div>




                    <div className="campo-form">
                        <input type="submit" className="btn btn-block btn-primario" value="Registrarme" />
                    </div>


                </form>

                

                <Link to={'/'} className="enlace-cuenta">
                    ¿Ya tiene una cuenta? ingresa aqui 
                </Link>
           </div>

       </div>
       </Fragment>
     );
}
 
export default NuevaCuenta;
