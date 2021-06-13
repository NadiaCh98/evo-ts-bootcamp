import React from 'react';
import { NavLink } from 'react-router-dom';
import { FAVORITES_ROUTE, SOLS_ROUTE } from '../../routes';
import classes from './Navbar.module.css';

interface NavbarItem {
  readonly link: string;
  readonly title: string;
}

const navbarLinks: NavbarItem[] = [
  {
    link: SOLS_ROUTE,
    title: 'Sols',
  },
  {
    link: FAVORITES_ROUTE,
    title: 'Favorites',
  },
];

export const Navbar: React.FC = () => (
  <nav className={classes.Navbar}>
    <ul>
      {navbarLinks.map((item, index) => (
        <li key={index}>
          <NavLink to={item.link} activeClassName={classes.active}>
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
