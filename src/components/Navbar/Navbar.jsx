import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/slices/themeSlice';
import css from './Navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.mode);

  const [randomTheme, setRandomTheme] = useState('');

  useEffect(() => {
    if (currentTheme.startsWith('random')) {
      document.body.setAttribute('data-theme', currentTheme); 
    } else {
      setRandomTheme(''); 
      document.body.setAttribute('data-theme', currentTheme); 
    }
  }, [currentTheme]);

  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme));
  };

  const handleRandomTheme = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    const selectedRandomTheme = `random${randomNumber}`;
    setRandomTheme(selectedRandomTheme);
    handleThemeChange(selectedRandomTheme);
  };

  return (
    <nav className={css.navbar}>
      <Link to="/" className={css.logo}>Olena Voina</Link>
      <ul className={css.navbarMenu}>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? css.active : '')} end>Home</NavLink></li>
        <li><NavLink to="/portfolio" className={({ isActive }) => (isActive ? css.active : '')}>Portfolio</NavLink></li>
        <li><NavLink to="/blog" className={({ isActive }) => (isActive ? css.active : '')}>Blog</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => (isActive ? css.active : '')}>Contacts</NavLink></li>
      </ul>

      <div className={css.themeSwitcher}>
        <button
          onClick={() => handleThemeChange('light')}
          className={currentTheme === 'light' ? css.active : ''}
        >
          Light
        </button>
        <button
          onClick={() => handleThemeChange('dark')}
          className={currentTheme === 'dark' ? css.active : ''}
        >
          Dark
        </button>
        <button
          onClick={handleRandomTheme}
          className={randomTheme ? css.active : ''}
        >
          Random
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
