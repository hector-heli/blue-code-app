import express from 'express';
import bodyParser from 'body-parser'
import morgan from 'morgan'
// import path from 'path'

// eslint-disable-next-line no-unused-vars
import pkg from './database.cjs'

// eslint-disable-next-line no-unused-vars
const { mongoose } = pkg

const server = express();

// Settings
// eslint-disable-next-line no-undef
server.set('port', process.env.PORT || 3000);

// Middlewares
server.use(bodyParser.json()) // Agrega este middleware para analizar el cuerpo de solicitudes con formato JSON
server.use(morgan('dev')) // Agrega este middleware para registrar las solicitudes y respuestas en la consola

// Configurar cabeceras y cors
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Reemplazar con el dominio desde donde proviene la solicitud
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.listen (server.get('port'), ()=> {
  console.log(`Server listening on port ${server.get('port')}`);
})

/* server.get('/api/calls', (req, res) => {
  res.send({ saludo:'¡Hola, mundo!'})
}) */

let users = [
  { id: 1, name: 'Juan', email: 'juan@example.com' },
  { id: 2, name: 'María', email: 'maria@example.com' },
  { id: 3, name: 'Pedro', email: 'pedro@example.com' }
]

server.post('/calls', (req, res) => {
  const user = req.body // El cuerpo de la solicitud debe contener los datos del usuario a agregar
  users.push(user)
  res.send('Usuario agregado correctamente')
  console.log(users)
})

server.get('/calls', (req, res) => {
  res.json(users)
})

server.get('/calls/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const user = users.find(user => user.id === userId)

  if (!user) {
    res.status(404).send('Usuario no encontrado')
  } else {
    res.json(user)
  }
})

server.put('/calls/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const updateUser = req.body

  let userIndex = users.findIndex(user => user.id === userId)

  if (userIndex === -1) {
    res.status(404).send('Usuario no encontrado')
  } else {
    users[userIndex] = { ...users[userIndex], ...updateUser }
    res.send('Usuario actualizado correctamente')
  }
})

server.delete('/calls/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  users = users.filter(user => user.id !== userId)
  res.send('Usuario eliminado correctamente')
})
