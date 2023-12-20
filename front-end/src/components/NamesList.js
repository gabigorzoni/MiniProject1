import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpdateName from './UpdateName';

function NamesList() {
  const [names, setNames] = useState([]);
  const [nameToUpdate, setNameToUpdate] = useState(null);

  const fetchName = async () => {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setNames(data.names);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchName();
    }, []);

    const updateName = (nameId, newName) => {
      const updatedNames = names.map((name) =>
        name._id === nameId ? { ...name, name: newName } : name
      );
      setNames(updatedNames);
      setNameToUpdate(null);
    };

    const deleteName = async (nameId) => {
      try {
        const response = await fetch(`/api/users/${nameId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          const updatedNames = names.filter((name) => name._id !== nameId);
          setUsers(updatedNames);
        } else {
          console.error(`Failed to delete user with ID ${nameId}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  return (
    <div className="usersList">
      <h1 class="title">Names List</h1>
      <ul>
        {names.map(name => (
          <li key={name._id}>
            {name.name}
            <button className="button" onClick={() => setNameToUpdate(name)}>Update</button>
            <button className="button" onClick={() => deleteName(name._id)}>Delete</button>
          </li>
          
        ))}
      </ul>
      <Link to="/add-name">
        <button className="button">Add Name</button>
      </Link>

      {nameToUpdate && <UpdateName name={nameToUpdate} updateName={updateName} />}

    </div>
  );
}

export default NamesList;