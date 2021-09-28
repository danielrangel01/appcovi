import React from 'react'

import MesajeSideBar from '../dashboard/MensajeSideBar';


const Sidebar = () => {


    return ( 

        <aside>
            <h1>APP <span>Coronavirus</span></h1>
            <div className="proyectos">
                <MesajeSideBar />
            </div>
        </aside>
     );
}
 
export default Sidebar;