import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <div>
      <h1>Chat</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/login">Login</Link> |{" "}
      </nav>
      <Outlet />
    </div>
  );
}
