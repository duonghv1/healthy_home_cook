import React from "react";
import './NavBar.css'
import { useNavigate } from "react-router-dom";
import MySVG from '../../assets/Vector.svg';
import Login from "../Login/Login";
import Logout from "../Logout/Logout";


export default function Navbar({logInStatus}) {
    const navigate = useNavigate();
    console.log("is log in?" + logInStatus);
    return (
        <nav>
           
            <div className='svg-container'>
                <img src={MySVG} alt="SVG" />
                <a href="/">Healthy Home Cook</a>
            </div>
                
            <div id="login-container">
                {!logInStatus ? (
                    // <button onClick={login}>Login</button>
                    <Login></Login>
                ) : (
                    <Logout></Logout>
                )}
            </div>
        </nav>
      );
}