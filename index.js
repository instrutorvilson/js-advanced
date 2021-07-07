const express = require('express')
let routesIndex = require('./routes/index');
let routesUsers = require('./routes/users');

const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(routesIndex);
app.use(routesUsers);

app.listen(3000, '127.0.0.1' , ()=>{
  console.log('servidor rodando')
});