import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserRoutes from './UserRoutes';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <Navbar />
      <UserRoutes />
    </>
  );
};

export default App;