const express =  require('express');
const cors = require('cors');
const morgan = require('morgan')
const config = require('./config')

const usuarios = require('./rutas/usuarios')
const calificaciones = require ('./rutas/calificaciones')
const historial = require ('./rutas/historial')
const vehiculos = require('./rutas/vehiculos')
const viajes = require('./rutas/viajes')

const app = express() 

//configurartion
app.set('port', config.app.port);

//midleware 
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded ({extended: true}));

// rutas

app.use('/api/usuarios', usuarios)
app.use('/api/calificaciones', calificaciones)
app.use('/api/historial', historial);
app.use('/api/vehiculos', vehiculos);

//rutas para viajes
app.use('/api/viajes', viajes);

module.exports = app;