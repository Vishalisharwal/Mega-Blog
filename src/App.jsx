import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth";
import './App.css';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components/index';
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
      .finally(() => { setLoading(false); });
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-grow bg-gray-100 py-8'> {/* Changed bg and added padding */}
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='text-xl text-gray-800'>Loading...</div>
    </div>
  );
}

export default App;
