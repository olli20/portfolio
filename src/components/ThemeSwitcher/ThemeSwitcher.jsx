import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/slices/themeSlice';
import { AiFillSun, AiFillMoon } from 'react-icons/ai';
import css from './ThemeSwitcher.module.css'; 

export const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.body.setAttribute('data-theme', currentTheme); 
  }, [currentTheme]);

  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme));
  };

  return (
    <div className={css.themeSwitcher}>
      <button
        onClick={() => handleThemeChange('light')}
        className={currentTheme === 'light' ? css.active : ''}
      >
        <AiFillSun />
      </button>
      <button
        onClick={() => handleThemeChange('dark')}
        className={currentTheme === 'dark' ? css.active : ''}
      >
        <AiFillMoon />
      </button>
    </div>
  );
};