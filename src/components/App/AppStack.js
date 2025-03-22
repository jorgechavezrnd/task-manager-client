import React from 'react';
import HomeView from '../Home/HomeView.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginView from '../Login/LoginView.js';
import RegisterView from '../Register/RegisterView.js';
import ProtectedRoute from '../../hooks/ProtectedRoute.js';
import TaskForm from '../Home/TaskForm.js';
import TaskUpdateForm from '../Home/TaskUpdateForm.js';

const AppStack = () => {
  return (
    <Routes>
      <Route path='/' element={ <Navigate to='/login' /> } />
      <Route path='/login' element={ <LoginView /> } />
      <Route path='/register' element={ <RegisterView /> } />
      <Route path='/home' element={ <ProtectedRoute><HomeView /></ProtectedRoute> } />
      <Route path='/tasks/create' element={ <ProtectedRoute><TaskForm /></ProtectedRoute> } />
      <Route path='/tasks/update/:id' element={ <ProtectedRoute><TaskUpdateForm /></ProtectedRoute> }  />
    </Routes>
  );
};

export default AppStack;
