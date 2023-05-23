import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';


// eslint-disable-next-line no-unused-vars
import mongoose from './database.js';
import callRouter from './routes/callsRoutes.js';
import reportRoutes from './routes/reportRoutes.js'

// import pkg from '../../package.json';

// eslint-disable-next-line no-unused-vars
const server = express();

// Settings
// eslint-disable-next-line no-undef
server.set('port', process.env.PORT || 3000);
// server.set('pkg', pkg)

// Middlewares
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json()) // Agrega este middleware para analizar el cuerpo de solicitudes con formato JSON
server.use(morgan('dev')) // Agrega este middleware para registrar las solicitudes y respuestas en la consola
server.use(cors());

// Configurar cabeceras y cors
server.use(function(req, res, next) {
  //Evitar buscar por url https://127.0.0.1:5173
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Reemplazar con el dominio desde donde proviene la solicitud
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Add the /calls/ route to the app using callRouter
server.use('/calls', callRouter);
server.use('/reports', reportRoutes);


server.listen (server.get('port'), ()=> {
  console.log(`Server listening on port ${server.get('port')}`);
})
