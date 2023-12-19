import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;