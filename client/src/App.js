import React, { Fragment } from 'react';
import{BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import ContactState from './context/contact/ContactState';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import PrivateRouting from  './components/routing/PrivateRouting';
import './App.css';


if(localStorage.token){
  setAuthToken(localStorage.token);
}


//COntactState id for accessing th action from many other childcomponents like add,update etc...
const App=()=> {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <Router>
    <Fragment className="App">
      <Navbar/>
      <div className='container'>
        <Alerts />
        <Switch>
          <PrivateRouting exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={Login}/>
        </Switch>
      </div>
    </Fragment>
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
