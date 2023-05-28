import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  justify-content: left;
`;

  
export const NavLink = styled(Link)`
  color: #000000;//results page
  font-family: 'georgia';
  font-size: 40px;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;//home page
    font-family: 'georgia';
  }
`;
