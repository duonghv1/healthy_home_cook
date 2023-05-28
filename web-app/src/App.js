import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Results from './pages/Results';
import Home from './pages/Home'; 
// import About from './pages/About';

function App() {
  const [clickedButtons, setClickedButtons] = useState([]);
  const [results, setResults] = useState([]);

  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home setResults={setResults} clickedButtons={clickedButtons} setClickedButtons={setClickedButtons}/>} />
        <Route path='/home' element={<Home setResults={setResults} clickedButtons={clickedButtons} setClickedButtons={setClickedButtons}/>} />
        <Route path='/results' element={<Results results={results} clickedButtons={clickedButtons}/>} />
        {/* <Route path='/projects' element={<Projects />} /> */}
      </Routes>
      
    </Router>
  );
}

export default App;
