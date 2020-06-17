import React from 'react';
import { Redirect } from 'react-router-dom';

const AdminDashboard = () => {
  const isAdmin = Math.random() < 0.5;
  return isAdmin ? <h1>WELCOME ADMIN!!!</h1> : <Redirect to="/" />
}

export default AdminDashboard;