const express = require('express');
var cors = require('cors');

const login=require('./routes/login')
const signup = require('./routes/signup')

const app = express();

const pool =require('./db');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('imgs'));
const routes = require('./routes')(app);

//挂载
app.use("/login", login);
app.use("/signup", signup);

const server = app.listen(3333, () => {
  console.log('Listening on port %s...', server.address().port);
});
