/*
    Criar API de usuarios:
    - Criar um usuario
    - Listar todos os usuarios
    - Alterar um usuario
    - Deletar um usuario

    d7mata
    GcFqZxbLba8OkVpL
*/
import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
app.use(express.json());

// Rota de criar usuario
app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        }
    });

    res.status(201).json(req.body)  // alem de criar, mostrar o que eu criei

});


// Rota de listar usuarios
app.get('/usuarios', async (req, res) => {

    let users = [];

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                age: req.query.age,
                email: req.query.email
                
            }
        })
    } else {
        users = await prisma.user.findMany();
    }

    res.status(200).json(users); // respondendo com o status da requisição e tambem os usuarios em json
});


// Rota de update de usuarios
app.put('/usuarios/:id', async (req, res) => {
    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        }
    });

    res.status(200).json(user);
});

// Rota de delete de usuarios:
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id,
        }
    })

    res.status(200).json({ message: "Usuario deletado com sucesso!" })
})


app.listen(3000);