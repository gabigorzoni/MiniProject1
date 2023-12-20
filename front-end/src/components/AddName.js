import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddName() {
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
      <h1 class="title">Add a Name</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <button className="button" type="submit">Add Name</button>
      </form>
      <br />
      <Link to="/" className="button">Back to Names List</Link>
    </div>
  );
}

export default AddName;
