import React from 'react'
import './Table.css'
import numeral from 'numeral'
//import uuid from "react-uuid";
const Table = ({tableData}) => {



    return ( 
        <div className="table">

            {tableData.map(({country, cases,updated}) =>(
                <tr>
                  
                    <td >{country}</td>
                    <td><strong>{numeral(cases).format("0,0")}</strong></td>

                </tr>

            ))}
        </div>

     );
}
 
export default Table;