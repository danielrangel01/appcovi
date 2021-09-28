import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import React, { useState, useEffect, Fragment } from 'react'
import Table from './Table';
import InfoBox from '../layout/InfoBox';
import Map from '../maps/Map'
import {sortData, prettyPrintStat} from '../../util'
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css'
import numeral from 'numeral';



const Dashboard_main = () => {

    const [countries, setCountries] = useState([]);
    const [country, setInputCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const  [tableData, setTableData] = useState([])
    const [mapCenter, setMapCenter] = useState({ lat: 10.9878, lng: -74.7889});
    const [mapZoom, setMapZoom] = useState(3)
    const [mapCountries, setMapCountries] = useState([])
    const [casesType, setCasesType] = useState('cases')
   

    useEffect(() => {
        const getData = async () => {
          await fetch("https://disease.sh/v3/covid-19/countries")
            .then(response => response.json())
            .then(data => {
              const countries = data.map(item => (
                {
                  name: item.country,
                  value: item.countryInfo.iso2
                }
              ))
                const sortedData = sortData(data)
                setTableData(sortedData)
                setMapCountries(data)
              setCountries(countries)
            })
        }
        getData()
      }, [])

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all')
          .then(response => response.json())
          .then(data => setCountryInfo(data))
      },[])

    const onCountryChange = async (e) => {
      const countryCode = e.target.value;

      const url =
        countryCode === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setInputCountry(countryCode);
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        });
    };


    // extraemos del state
     const {todayCases,todayRecovered, todayDeaths,  cases,recovered, deaths} = countryInfo
    return (
        <Fragment>
            <div className="app">

            <div className="app_left">

            <div className="app_header">

                <h1>COVID MAP</h1>
                <FormControl className="app_dropdown">
                    <Select 
                    variant="outlined" 
                    value={country} 
                    onChange={onCountryChange}>
                        <MenuItem 
                        value='worldwide'
                        >{country}</MenuItem>
                        {countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>

            <div className="app_stats">

            <InfoBox 
            onClick={(e) => setCasesType("cases")}
            title="CASOS DE CORONAVIRUS" 
            active={casesType === "cases"}
            cases={prettyPrintStat(todayCases)} 
            total={numeral(cases).format("0.0a")}
          />
          <InfoBox 
            onClick={(e) => setCasesType("recovered")}
            title="RECUPERADOS" 
            isGreen
            active={casesType === "recovered"}
            cases={prettyPrintStat(todayRecovered)} 
            total={numeral(recovered).format("0.0a")}
          />
          <InfoBox 
            onClick={(e) => setCasesType("deaths")}
            title="FALLECIDOS"
            active={casesType === "deaths"} 
            cases={prettyPrintStat(todayDeaths)} 
            total={numeral(deaths).format("0.0a")}
          />


            
            </div>
                  <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
            

            </div>

            
                <Card className="app_right" >
                    <CardContent>
                        <h3>Casos en tiempo real  por país</h3>
                        <Table tableData={tableData} />
                        <h3 style={{marginTop:'25px'} }>Casos nuevos en el mundo </h3>
                        <LineGraph casesType={casesType}/>
                    </CardContent>
                </Card>
           

                </div>
        </Fragment>

    );
}

export default Dashboard_main;