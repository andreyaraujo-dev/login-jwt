const jwt = require('jsonwebtoken');
const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

module.exports = {
  async index(req, res) {
    const { username, password } = req.body;

    try {
      const [user] = await connection('users').select('*').where('username', username);
      if (!user) return res.json({ error: 'User does not exists' });

      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) return res.json({ error: err });
        if (!isValid) return res.json({ error: 'Password is invalid' });

        const userId = user.id;
        const token = jwt.sign({ userId }, process.env.SECRET, {
          expiresIn: 300 //expira em 5 min
        });

        return res.json({ auth: true, token: token });
      });
    } catch (error) {
      return res.json({message: 'Unable to login, try again!', errro: error});
    }
  },
}