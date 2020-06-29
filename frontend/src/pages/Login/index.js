import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import { Context } from '../../Context/AuthContext';

import './style.css';
import ImgLogin from '../../assets/img-login.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { handleLogin } = useContext(Context);

  return (
    <div className="container">
      <div className="container-img">
        <img src={ImgLogin} alt="Login JWT" className="img-maior"/>
      </div>
      <div className="container-form">
        <div className="container-login">
          <h1>Welcome back!</h1>
          <h2>Log in to access the system.</h2>
          <form onSubmit={(e) => handleLogin(e, username, password)} >
            <input 
              type="text" 
              className="input-form" 
              placeholder="Username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input 
              type="password" 
              className="input-form" 
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="button-form">Log in <FiLogIn size={16} color="#FFF" /></button>
          </form>
          <div className="row-footer">
            <small>
              New here? <Link to="/register" className="link" >Sign up.</Link> 
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}