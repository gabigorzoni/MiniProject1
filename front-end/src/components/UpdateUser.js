import React, { useState } from 'react';

function UpdateUser({ user, updateUser }) {
  const [updatedName, setUpdatedName] = useState(user.name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedName }),
      });

      if (response.ok) {
        updateUser(user._id, updatedName);
      } else {
        console.error(`Failed to update user with ID ${user._id}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
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
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUser;
