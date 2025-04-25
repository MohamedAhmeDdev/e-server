const {signup, login} = require('../Controller/Auth');

const express = require('express');
const Auth = express.Router();

Auth.post('/signup', signup);
Auth.post('/login', login);



module.exports = Auth;