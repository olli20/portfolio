import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import css from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={css.navbar}>
      <Link to="/" className={css.logo}>Olena Voina</Link>
      <ul className={css.navbarMenu}>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? css.active : '')} end>Home</NavLink></li>
        <li><NavLink to="/portfolio" className={({ isActive }) => (isActive ? css.active : '')}>Portfolio</NavLink></li>
        <li><NavLink to="/blog" className={({ isActive }) => (isActive ? css.active : '')}>Blog</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => (isActive ? css.active : '')}>Contacts</NavLink></li>
      </ul>

      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;
