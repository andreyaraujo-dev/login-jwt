const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

module.exports = {
  async store(req, res) {
    const { name, email, username, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 8);

    const [user] = await connection('users').insert({
      name,
      email,
      username,
      password: passwordHash
    });

    return res.status(200).json({ user });
  },

  async perfil(req, res) {
    const idUser = req.userId;

    try {
      const [user] = await connection('users').select('*').where('id', 1);

      if (!user) return res.json({ error: 'User dos not exists' });

      const { name, email, username, created_at } = user;

      return res.json({ name, email, username, created_at });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
}