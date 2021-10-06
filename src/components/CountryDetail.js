import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Header from './Header';
import {useParams,Link} from 'react-router-dom'


const Countries = () => {
    const params = useParams();
  const getMode = () =>{
    return JSON.parse(localStorage.getItem("mode"))||false
}
const [dark,setMode] = useState(getMode())

useEffect(()=>{
    localStorage.setItem("mode",JSON.stringify(dark))
},[dark])

  const [ detail, setDetail] = useState("")
  const [lang, setlang] = useState("");
  const [currency, setcurrency] = useState("");

  const obtenerPais = async () =>{
    const respuesta = await axios.get(`https://restcountries.com/v3.1/name/${params.name}`);         
    setDetail(respuesta.data[0])   
    loadlang(respuesta.data[0]);
    loadcurrency(respuesta.data[0]);
    console.log(respuesta.data[0])
}

const loadlang = (countryData) => {
  const languages = Object.entries(countryData.languages)
    .map((lang) => lang[1])
    .join(", ");
  setlang(languages);
};

const loadcurrency = (countryData) => {
  const currency = Object.entries(countryData.currencies)
    .map((cur) => cur[0])
    .join(", ");
  setcurrency(currency);
};

useEffect(() => {
    if (params.name) {
        obtenerPais();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className = {dark?"container dark-mode":"container light-mode"}>
         < Header  mode = {dark} setMode = {setMode}/>
         <div className = "container-detail">
            <Link to = "/" className="btn-back">Back to</Link>
         {!detail ? null : (
            <div className = "country-detail">
                   <img src={detail.flags.png} alt="" className="detail-img" />
                  <div className="country-info1">
                      <h2>{detail.name.official}</h2>
                      {/* <p><span>Native name:</span>{detail.name.common}</p> */}
                      <p><span>Region:</span> {detail.region}</p>
                      <p><span>Sub Region:</span> {detail.subregion}</p>
                      <p><span>Capital:</span> {detail.capital}</p>
                  </div>
                  <div className="country-info2">
                      <p><b>Languages: </b>{!lang ? null : lang}</p>
                      <p><b>Currencies: </b>{!currency ? null : currency}</p>
                  </div>
          </div> 
         )
         }    
    </div>
  </div>  
  );
}

export default Countries;