import React from 'react';
import { useUser } from '../contexts/UserContext';

function Dashboard() {
  const { user, logout } = useUser();

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
