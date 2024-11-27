/*
    Criar API de usuarios:
    - Criar um usuario
    - Listar todos os usuarios
    - Alterar um usuario
    - Deletar um usuario
*/
import express from 'express';


const app = express();
app.use(express.json());

const usuarios = [];

app.post('/usuarios', (req, res) => {

    usuarios.push(req.body) // salvando o usuario dentro da variavel
    res.send('Ok, postt')
});


app.get('/usuarios', (req, res) => {

    res.json(usuarios); 
});

app.listen(3000);