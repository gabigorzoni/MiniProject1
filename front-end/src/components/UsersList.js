import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpdateUser from './UpdateUser';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [userToUpdate, setUserToUpdate] = useState(null);

  const fetchUser = async () => {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const updateUser = (userId, newName) => {
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, name: newName } : user
      );
      setUsers(updatedUsers);
      setUserToUpdate(null);
    };

    const deleteUser = async (userId) => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          const updatedUsers = users.filter((user) => user._id !== userId);
          setUsers(updatedUsers);
        } else {
          console.error(`Failed to delete user with ID ${userId}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  return (
    <div className="usersList">
      <h1 class="title">Users List</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name}
            <button className="button" onClick={() => setUserToUpdate(user)}>Update</button>
            <button className="button" onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
          
        ))}
      </ul>
      <Link to="/add-user">
        <button className="button">Add User</button>
      </Link>

      {userToUpdate && <UpdateUser user={userToUpdate} updateUser={updateUser} />}

    </div>
  );
}

export default UsersList;