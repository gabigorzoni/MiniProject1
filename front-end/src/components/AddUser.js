import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddUser() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {   
    e.preventDefault();

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setName('');
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1 class="title">Add User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <button className="button" type="submit">Add User</button>
      </form>
      <br />
      <Link to="/" className="button">Back to Users List</Link>
    </div>
  );
}

export default AddUser;
