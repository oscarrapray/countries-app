import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Countries from './components/Countries'
import CountryDetail from './components/CountryDetail'
import './css/estilos.css'

function App() {


  return (
    <Router>
    <Switch>
       <Route exact path = "/" component={Countries} />
       <Route path = "/Countries/:name" component={CountryDetail} />
    </Switch>
  </Router>
  );
}

export default App;
