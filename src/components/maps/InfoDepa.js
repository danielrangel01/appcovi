import React,{useState,useEffect,Fragment} from 'react';
import {  Popup , Marker} from 'react-leaflet'



const InfoDepa = () => {


    useEffect(() => {
      const getDatadepa = async () => {
        await fetch("https://disease.sh/v3/covid-19/jhucsse")
          .then(response => response.json())
          .then(data => {
            const infodep = data.map(item => (
              {
                namecountry: item.country,
                nameprovince : item.province,
                estadisticas: item.stats,
                cordenadas: {

                    lat: item.coordinates.latitude,
                    lng: item.coordinates.longitude
                       
                           }

              }
            ))
            setDepaInfo(infodep);
            setloading(true)

          })
      }
      getDatadepa()
    }, [])


const [depainfo, setDepaInfo] = useState()
const [loading, setloading] = useState(false)
const fillRedOptions = { fillColor: 'red' }

const filtrado = depainfo && depainfo.filter(info => info.namecountry === 'Colombia')



    return ( <Fragment>
        {loading ? 
        
       filtrado && filtrado.map((info,i) => (
      <Marker
        
        key={i} 
        position={info.cordenadas}
      >
        <Popup>
          <div className="info-container">
          
            <div className="info-name"> Pais: {info.namecountry}</div>
            <div className="info-depa">Departamento: {info.nameprovince}</div>
            <div className="info-confirmed">
              Casos Confirmados: {info.estadisticas.confirmed}
            </div>
            <div className="info-recovered">
              Recovered: {info.estadisticas.confirmed / 2}
            </div>
            <div className="info-deaths">
              Fallecidos: {info.estadisticas.deaths}
            </div>
          </div>
        </Popup>
      </Marker>
    ))
        
        
        
        : null} 

        </Fragment> )
}
 
export default InfoDepa;