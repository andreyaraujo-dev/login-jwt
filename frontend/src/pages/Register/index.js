import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './style.css';
import ImgRegister from '../../assets/img-register.png';

import api from '../../services/api';


export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleFormSubmit(e){
    e.preventDefault();

    const data = {
      name, 
      email, 
      username, 
      password 
    }

    try {
      await api.post('/register', data);
      alert('Cadastro realizado com sucesso!');
      history.push('/login');
    } catch (error) {
      alert(`Não foi possivel fazer o cadastro, tente novamente! Erro: ${error}`);
    }


  }

  return (
    <div className="container">
      <div className="container-img">
        <img src={ImgRegister} alt="Login JWT" className="img-maior"/>
      </div>
      <div className="container-form">
        <div className="container-register">
          <h2>Create account now!</h2>
          <form onSubmit={handleFormSubmit}>
            <input 
              type="text" 
              className="input-form" 
              placeholder="Name"
              onChange={e => setName(e.target.value)}
              value={name}
            />
            <input 
              type="email" 
              className="input-form" 
              placeholder="E-mail"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <input 
              type="text" 
              className="input-form" 
              placeholder="Username"
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
            <input 
              type="password" 
              className="input-form" 
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            <button type="submit" className="button-form">Create account <FiLogIn size={16} color="#FFF" /></button>
          </form>
          <div className="row-footer">
            <small>
              Already have an account? <Link to="/login" className="link" >Login.</Link> 
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}