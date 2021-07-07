const express = require('express')

let app = express();

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<h1> Olá pessoal </h1>');
});

app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({
        users:[
                {nome: "jose", idade: 45, id: 1},
                {nome: "Maria", idade: 50, id: 2}
             ]
    });
});

app.listen(3000, '127.0.0.1' , ()=>{
  console.log('servidor rodando')
});