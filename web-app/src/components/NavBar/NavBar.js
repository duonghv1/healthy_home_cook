import React from "react";
import './NavBar.css'
import { Nav, NavLink } from './NavBarElement';

export default function Navbar() {
    return (
        <Nav>
        <ul>
            <li>
              <NavLink to="/home">Healthy Home Cook</NavLink>
            </li>
        </ul>
        </Nav>
      );
}