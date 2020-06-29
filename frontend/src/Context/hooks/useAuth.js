import { useState, useEffect } from 'react';

import api from '../../services/api';
import history from '../../history';

export default function useAuth() {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  async function handleLogin(e, username, password) {
    e.preventDefault();

    const formData = {
      username,
      password
    }

    try {
      const { data: { token, userId } } = await api.post('/auth', formData);

      if (!token) return alert('Usuário ou senha inválidas, tente novamente!')

      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('userId', JSON.stringify(userId));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      history.push('/perfil');
    } catch (error) {
      return alert(`Erro ao realizar login, Erro: ${error}`);
    }
    
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.clear();
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }
  
  return { authenticated, loading, handleLogin, handleLogout };
}