import React, {useState,useEffect} from 'react'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home.js'
import LogIn from './components/pages/LogIn.js'


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/log-in' element={<LogIn/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
