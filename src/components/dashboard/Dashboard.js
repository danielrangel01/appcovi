import React,{Fragment} from 'react'
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import Dashboard_main from './Dashboard_info'


const Dashboard = () => {

    
    
    return ( 
        <Fragment>
        <div className="contenedor-app">
            <Sidebar />

            <div className="seccion-principal">
               <Barra/>
               
               <main>
                   
                <div className="contendor-tareas">
                    <Dashboard_main/>
                </div>

                </main>
            </div>

        </div>

        </Fragment>
    )}
 
export default Dashboard;