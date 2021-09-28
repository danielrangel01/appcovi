import React,{useState, useMemo,useCallback,useRef} from 'react'
import { MapContainer, TileLayer, Marker, Popup , useMapEvents} from 'react-leaflet'
import "./Map.css";
import { showDataOnMap } from '../../util';
import {DefaultIcon} from './icon'
import 'leaflet/dist/leaflet.css'
import { db } from '../../firebase-config';
import { collection, addDoc} from "firebase/firestore";
import SuperMarker from './SuperMaker'
import InfoDepa from './InfoDepa'




const Map = ({ countries, casesType, center, zoom, }) => {





    const agregarDatabase = async (usuarioCovi) => {
      
        try {
            const docRef = await addDoc(collection(db, "usercovi"), {usuarioCovi});
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }


    function LocationMarker() {

        const [mapZoom, setMapZoom] = useState(15);
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
              
            setPosition(e.latlng)
            map.flyTo(e.latlng,mapZoom)
             
            } } )
    
      
        return position === null ? null : (
          <Marker position={position}
         
          >
            <Popup>
            <h1>Tu estas ¡Aqui!</h1>
           
            </Popup>
          </Marker>
        )
      }


      /////---------------///

      function DraggableMarker() {

                ///////
        //State de info marker
        const [usuarioCovi, guardarUsuarioCovi] = useState({
            nombre: '',
            edad: '',
            telefono: '',
            sintomas: '',
            cordenadas: []
           
        })
    
            const {nombre, edad, telefono, sintomas} = usuarioCovi;
     
    
            const onChange = e => {
    
                guardarUsuarioCovi({
                    ...usuarioCovi,
                    [e.target.name] : e.target.value
                })
            
                };
            
               
            
                const handleSubmit = (e) => {
                    e.preventDefault()
    
                   
                    
                    if(nombre === '' || edad === '' || telefono === '' || sintomas === '' ) {
                
                        return;
                    }
                    guardarUsuarioCovi(usuarioCovi.cordenadas =  [position.lat,position.lng])
                    guardarUsuarioCovi(usuarioCovi);
                       agregarDatabase(usuarioCovi);
                       guardarUsuarioCovi({
                        nombre: '',
                        edad: '',
                        telefono: '',
                        sintomas: '',
                        cordenadas: []
            
            
                    })
    
            
                }

        const [draggable, setDraggable] = useState(false)
        const [position, setPosition] = useState({lat: 10.9878, lng: -74.7889})
        const markerRef = useRef(null)
        const eventHandlers = useMemo(
          () => ({
            dragend() {
              const marker = markerRef.current
              if (marker != null) {
                setPosition(marker.getLatLng())
              }
            },
          }),
          [],
        )
        const toggleDraggable = useCallback(() => {
          setDraggable((d) => !d)
        }, [])
      
        return (
          <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
              <span onClick={toggleDraggable}>
              <form
                  onSubmit={handleSubmit}
                  >
                      <div className="campo-form">
                          
                         <input type="text"
                         id="nombre"
                         name="nombre"
                         placeholder="Nombre"
                         value={nombre}
                         onChange={onChange}
                         />
                      </div>
  
                      <div className="campo-form">
                        
                         <input type="text"
                         id="edad"
                         name="edad"
                         placeholder="Edad"
                         onChange={onChange}
                         value={edad}
                         />
                      </div>

                      <div className="campo-form">
                        
                         <input type="text"
                         id="telefono"
                         name="telefono"
                         placeholder="Telefono"
                         onChange={onChange}
                         value={telefono}
                         />
                      </div>

                      <div className="campo-form">
                        
                         <textarea type="text"
                         id="sintomas"
                         name="sintomas"
                         placeholder="Sintomas"
                         onChange={onChange}
                         value={sintomas}
                         />
                      </div>
  
                      <div className="campo-form">
                          <input type="submit" className="btn btn-block btn-primario" value="Guardar" />
                      </div>
  
                  </form>    
              </span>
            </Popup>
          </Marker>
        )
      }
    const [mapZoom, setMapZoom] = useState(7);
    const [map, setmap] = useState(null);
    if (map) {
    map.flyTo(center,mapZoom);
    }
        
    return (
        <div className="map">
              
            <MapContainer center={center} zoom={zoom}  whenCreated={setmap}   >
              
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
         
                {showDataOnMap(countries, casesType)}
                <InfoDepa/>
                <DraggableMarker/>
                <SuperMarker/>
                <LocationMarker/>
            </MapContainer>
        </div>
    )
}

export default Map