import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NamesList from './components/NamesList';
import AddName from './components/AddName';

function App() {
  return (
    <div class="mainDiv">
      <Router>
        <Routes>
          <Route path="/" element={<NamesList />} />
          <Route path="/add-name" element={<AddName />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;