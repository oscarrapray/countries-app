import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({name,region,capital,bandera}) =>{
    return (
        <div className="country-card">
             <img src={bandera} alt="" className={name} />
                <div className="card-description">
                <Link to={`/Countries/:${name}`} className="card-title"><h2 >{name}</h2></Link>
                    <p className="card-txt"><span>Region:</span> {region}</p>
                    <p className="card-txt"><span>Capital:</span> {capital}</p>
                </div> 
        </div>
    )
}

export default CountryCard