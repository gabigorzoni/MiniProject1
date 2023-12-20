import React, { useState } from 'react';

function UpdateName({ name, updateName }) {
  const [updatedName, setUpdatedName] = useState(name.name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/update/${name._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedName }),
      });

      if (response.ok) {
        updateUser(name._id, updatedName);
      } else {
        console.error(`Failed to update user with ID ${name._id}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Update Name</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update Name</button>
      </form>
    </div>
  );
}

export default UpdateName;
