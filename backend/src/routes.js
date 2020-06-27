const express = require('express');
const HomeController = require('./controllers/HomeController');
const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');
const verifyJWT = require('./middlewares/verifyJWT');

const routes = express.Router();

routes.get('/', HomeController.index);

routes.post('/login', LoginController.index);

routes.get('/perfil', verifyJWT, UserController.perfil);
routes.post('/register', UserController.store);

module.exports = routes;