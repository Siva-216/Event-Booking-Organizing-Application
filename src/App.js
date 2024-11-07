import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Home from '../src/Components/Home.jsx';
import './App.css';
import Signup from './Components/Signup.jsx';
import Signin from './Components/Signin.jsx';
import Events from './Components/Events.jsx';
import CreateEvent from './Components/CreateEvent.jsx';
import UpdateEvent from './Components/UpdateEvent.jsx';
import UserProvider from './Components/UserContext.jsx';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login' element={<Signin />} />
        <Route path='/Events' element={<Events />} />
        <Route path='/CreateEvent' element={<CreateEvent />} />
        <Route path='/UpdateEvent' element={<UpdateEvent />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
