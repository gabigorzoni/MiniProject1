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

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name}
            <button onClick={() => setUserToUpdate(user)}>Update</button>
          </li>
          
        ))}
      </ul>
      <Link to="/add-user">
        <button>Add User</button>
      </Link>

      {userToUpdate && <UpdateUser user={userToUpdate} updateUser={updateUser} />}

    </div>
  );
}

export default UsersList;