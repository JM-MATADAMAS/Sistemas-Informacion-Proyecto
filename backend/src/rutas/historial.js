const express = require('express');

const respuestas= require('../red/respuestas')
const controlador = require('../controlador/controlador');

const router= express.Router()

router.get('/conductor/:Cal_Califica_Usu_NUA', historialConductor);
router.get('/pasajero/:Cal_Califica_Usu_NUA', historialPasajero);
router.put('/conductor/:via_Id', actualizarViajeStatus);

async function historialConductor (req, res, next) {
  try {
    const items = await controlador.historialConductor(req.params.Cal_Califica_Usu_NUA); 
    respuestas.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function historialPasajero (req, res, next) {
  try {
    const items = await controlador.historialPasajero(req.params.Cal_Califica_Usu_NUA); 
    respuestas.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function actualizarViajeStatus (req, res, next) {
  try {
    const items = await controlador.actualizarViajeStatus(req.params.via_Id); 
    respuestas.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

module.exports=router;