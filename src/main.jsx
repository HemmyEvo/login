import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.jsx'
import './index.css'
import Footer from './Component/Footer.jsx';
import Header from './Component/Header.jsx';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import SignUp from './SignUp.jsx';
import SignIn from './SignIn.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <Header />
    <Routes>
      <Route path='/home' Component={Home}/>
      <Route exact path='/' Component={SignIn}/>
      <Route path='/sign-up' Component={SignUp}/>
    </Routes>

    <Footer />
    </Router>
 

  </React.StrictMode>
   
 
)
