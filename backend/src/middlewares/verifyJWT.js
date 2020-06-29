const jwt = require('jsonwebtoken');

const verifyJWT = (req, res,next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ auth: false, message: 'No token provided.' });

  // const token = req.headers['Authorization'];
  // if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  const [, token] = authorization.split(' ');

  try {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token' });
  
      //se estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: `Erro: ${error}` });
  }
}

module.exports = verifyJWT;