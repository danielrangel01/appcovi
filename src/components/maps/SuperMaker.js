import React , {useState,useEffect, Fragment}from 'react'
import { db } from '../../firebase-config';
import { collection, getDocs} from "firebase/firestore";
import { Marker,Popup } from 'react-leaflet';


const SuperMarker = () => {

    const [data, setDat] = useState()
    const [loading, setloading] = useState(false)


    useEffect(() => {
        
        const GetDatabase = async () => {
            
         const userCovicol = collection(db, 'usercovi');
         const citySnapshot = await getDocs(userCovicol);
         const usercovi = citySnapshot.docs.map(doc => doc.data());
         setDat(usercovi);
         setloading(true)
         
         
       }
 
       GetDatabase()
     
     }, [data]);

     
    return (<Fragment>
         
         {loading ? data.map((item,i) => (
        <Marker key={i} position={item.usuarioCovi.cordenadas} >

            <Popup>
                <h2>Caso Covid</h2>
                <div className="info-container">
    
                    <div className="info-confirmed">
                        Nombre: {item.usuarioCovi.nombre}
                    </div>
                    <div className="info-recovered">
                        Edad: {item.usuarioCovi.edad}
                    </div>
                    <div className="info-deaths">
                        Telefono: {item.usuarioCovi.edad}
                    </div>
                    <div className="info-deaths">
                        Sintomas: {item.usuarioCovi.sintomas}
                    </div>
                </div>
            </Popup>

        </Marker>
        
      )): null }
      </Fragment>
    )
}
 
export default SuperMarker;