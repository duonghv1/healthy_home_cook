import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Results from './pages/Results';
import Home from './pages/Home'; 
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

// import About from './pages/About';

function App() {
  const [clickedButtons, setClickedButtons] = useState([]);
  const [results, setResults] = useState([]);

  // Depending on whether the user is logged in or not, we want to render
  // different elements to the page. Use a state variable to keep track of
  // this.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Upon page load, check whether the user is logged in or not using the
  // `onAuthStateChanged` function provided by Firebase. Update the login
  // state above depending on whether they are logged in or not.
  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if (user){
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
      }
    })
   });

  return (
    <>
      <Router>
        <Navbar logInStatus={isLoggedIn} />
        <Routes>
          <Route path='/' exact element={<Home setResults={setResults} clickedButtons={clickedButtons} setClickedButtons={setClickedButtons}/>} />
          <Route path='/home' element={<Home setResults={setResults} clickedButtons={clickedButtons} setClickedButtons={setClickedButtons}/>} />
          <Route path='/results' element={<Results results={results} clickedButtons={clickedButtons}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path='/projects' element={<Projects />} /> */}
        </Routes>
        
      </Router>
    </>
  );
}

export default App;
