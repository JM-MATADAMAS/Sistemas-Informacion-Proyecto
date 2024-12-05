const express = require('express');

const respuestas= require('../red/respuestas')
const controlador = require('../controlador/controlador');

const router= express.Router()

router.get('/', todas_Calificaciones);
router.get('/:Cal_Califica_Usu_NUA', un_Usuario_Calificacion);
router.get('/validar/:Cal_Califica_Usu_NUA/:Cal_Via_Id', validar_Calificación)
router.post('/',insertar_Calificación);

async function todas_Calificaciones (req,res,next){
  try {
      const items= await controlador.todos_usuario('calificaciones'); 
      respuestas.success(req, res, items, 200)
  } catch (err) {
      next(err);
  }
}

async function un_Usuario_Calificacion (req,res,next){
  try {
      const items= await controlador.un_Usuario_Calificacion('calificaciones',req.params.Cal_Califica_Usu_NUA); 
      respuestas.success(req, res, items, 200)
  } catch (err) {
      next(err);
  }
}

async function insertar_Calificación (req,res,next){
  try {
      const items= await controlador.insertar_Calificación(req.body); 
      respuestas.success(req, res, items, 200)
  } catch (err) {
      next(err);
  }
}

async function validar_Calificación (req,res,next){
  try {
      const items= await controlador.validar_Calificación(req.params.Cal_Califica_Usu_NUA, req.params.Cal_Via_Id); 
      respuestas.success(req, res, items, 200)
  } catch (err) {
      next(err);
  }
}

module.exports=router;