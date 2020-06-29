import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

// import { parseISO, format } from 'date-fns';

import api from '../../services/api';
import './style.css';
import imgPerfil from '../../assets/img-perfil.png';

export default function Perfil() {
  const { handleLogout } = useContext(Context);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [created_at, setCreated_at] = useState('');
  const userId = localStorage.getItem('userId');

  const created_at_data = created_at.split('.');
  const created_at_hora = created_at_data[0].split('T');
  const data = `${created_at_hora[0]} ${created_at_hora[1]}`;
  // const date = new Date(data);
  // const formattedDate = format(
  //   date, 
  //   "'Dia' dd 'de' MMMM', às ' HH:mm'h'"
  // );

  useEffect(() => {
    api.get('user', {
      headers: {
        UserId: userId
      }
    }).then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setUsername(response.data.username);
      setCreated_at(response.data.created_at);
    });
  }, [userId]);

  return (
    <div className="container">
      <div className="container-img">
        <img src={imgPerfil} alt="Login jwt" className="img-maior"/>
      </div>
      <div className="container-form">
        <div className="container-perfil">
          <h1>Wellcome {name}</h1>
          <label htmlFor="name">Name</label>
          <input 
            type="text"
            className="input-form-perfil"
            id="name"
            disabled
            value={name}
          />
          <label htmlFor="email">E-mail</label>
          <input 
            type="text"
            className="input-form-perfil"
            id="email"
            disabled
            value={email}
          />
          <label htmlFor="username">Username</label>
          <input 
            type="text"
            className="input-form-perfil"
            id="username"
            disabled
            value={username}
          />
          <label htmlFor="member-since">Member Since</label>
          <input 
            type="text"
            className="input-form-perfil"
            id="member-since"
            disabled
            value={data}
          />
          
          <button type="button" onClick={handleLogout} className="button-form">Log out <FiLogOut size={16} color="#FFF" /></button>
          <div className="row-footer">
            <small>
              Created and developed by Jacksson Andrey 
            </small>
          </div>
        </div>
      </div>
    </div>
  ); 
}