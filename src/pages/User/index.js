import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JsonUser = () => {
  const [users, setUsers] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect =
    (() => {
      const fetchUsers = async () => {
        try {
          setError(null);
          setUsers(null);
          setIsLoading(true);
          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/users',
          );
          setUsers(response.data);
        } catch (error) {
          setError(error);
        }
        setIsLoading(false);
      };
      fetchUsers();
    },
    []);
  if (loading) return <div>로딩중 ...</div>;
  if (error) return <div>에러</div>;
  if (!users) null;

  return (
    <ul>
      {users.map((user) => {
        <li key={user.id}>
          {user.username}({user.name})
        </li>;
      })}
    </ul>
  );
};

export default JsonUser;
