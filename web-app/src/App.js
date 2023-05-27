import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
// import Projects from './pages/Projects';
import Home from './pages/Home'; 
// import About from './pages/About';

function App() {
  const [results, setResults] = useState([])
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home setResults={setResults}/>} />
        <Route path='/home' element={<Home setResults={setResults}/>} />
        {/* <Route path='/about' element={<About />} /> */}
        {/* <Route path='/projects' element={<Projects />} /> */}
      </Routes>
      
    </Router>
  );
}

export default App;
