import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';

function App() {
  return (
    <div class="mainDiv">
      <Router>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;