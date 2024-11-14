import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './services/auth';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <p className='loader'></p>
    </div>
  ) : (

    <Outlet/>
  );
}

export default App;
