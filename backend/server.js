const express = require('express');
var cors = require('cors');

var Login = require('../client/src/pages/Login/index');
var signUp = require('../client/src/pages/Login/signup');

const app = express();

const pool =require('./db');

app.use('/Login',Login);
app.use('signUp',signUp);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('imgs'));
const routes = require('./routes')(app);

const server = app.listen(3333, () => {
  console.log('Listening on port %s...', server.address().port);
});
