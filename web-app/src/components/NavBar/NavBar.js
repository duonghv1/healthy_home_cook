import React from "react";
import './NavBar.css'
import { Nav, NavLink } from './NavBarElement';

import MySVG from '../../assets/Vector.svg';

export default function Navbar() {
    return (
        <Nav>
        <ul>
            <li>
                <div className='svg-container'>
                    <img src={MySVG} alt="SVG" />
                    <NavLink to="/" className="nav-link">Healthy Home Cook</NavLink>
                </div>
            </li>
        </ul>
        </Nav>
      );
}