import React from 'react'

const Header = ({mode,setMode}) =>{
    
    var txt = ""
    mode?(txt = "Dark Mode"):(txt = "Light Mode")

    return(
        
        <div className = "cabezera">
            <div className = "cab-content l-container">
                <h2>Where in the World</h2>
                <div className="sec-toggle">
                        <label htmlFor="toggle">{txt}</label>
                        <input type="checkbox" onChange = {()=>setMode(!mode)}/>
                </div>
            </div>
        </div>
    )
}

export default Header