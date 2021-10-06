import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import Header from './Header';
import CountryCard from './CountryCard';


const Countries = () => {

  const getMode = () =>{
    return JSON.parse(localStorage.getItem("mode"))||false
}
const [dark,setMode] = useState(getMode())

useEffect(()=>{
    localStorage.setItem("mode",JSON.stringify(dark))
},[dark])

  const [country,setCountry] = useState([])
  const [lisCountry,setListCountry] = useState([])
  const [busqueda,setBusqueda] = useState({
    search: ''
  })
const {search} = busqueda

    const ConsultarApi = async () =>{
        try{
          const respuesta = await Axios.get('https://restcountries.com/v3/all');         
          setCountry(respuesta.data)  
          setListCountry(respuesta.data)      
        }
        catch(error){
          console.log(error)
        }
      }
      

      const selectRegion = async e =>{
        const termino = e.target.value
        if(termino ==='') return
          else{
            try{
              const respuesta = await Axios.get(`https://restcountries.com/v3/region/${termino}`);         
              setCountry(respuesta.data)        
            }
            catch(error){
              console.log(error)
            }
          }
      }

    const searchCountry =e =>{
      setBusqueda({
        ...busqueda,
        [e.target.name] : e.target.value
      })
       filtrar(e.target.value);
    }

    const filtrar=(terminoBusqueda)=>{
      var resultadosBusqueda=lisCountry.filter((elemento)=>{
        if(elemento.name.common.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ){
          return elemento;
        }
      });
      setCountry(resultadosBusqueda);
    }

      useEffect(()=>{  
        ConsultarApi()
    },[]) 


  return (

    <div className = {dark?"container dark-mode":"container light-mode"}>
         < Header  mode = {dark} setMode = {setMode}/>
         <div className = "container-country">
         <div className="country-header">
              <input type="text" placeholder="search for a country" name = "search"
              value ={search} onChange = {searchCountry}/>
              <select name="" id="" onChange ={selectRegion}>
                  <option value="">Filter by region</option>
                  <option value="africa">Africa</option>
                    <option value="americas">America</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
              </select>
          </div>
            <div className="country-grid">
                {
                    country.map(c=>(
                        <CountryCard 
                          key = {c.name.common}
                          name ={c.name.common}
                          region={c.region}
                          capital ={c.capital}
                          bandera={c.flags[0]}
                        />
                    ))
                }          
            </div>
         </div>
    </div>
    
  );
}

export default Countries;