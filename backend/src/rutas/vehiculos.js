const express = require('express');

const respuestas= require('../red/respuestas')
const controlador = require('../controlador/controlador');

const router= express.Router()

router.get("/", todos_vehiculo);
router.get("/:Car_Usu_NUA", un_vehiculo);
router.post("/", agregar_vehiculo);
router.put("/:id", actualizar_vehiculo);
router.delete("/:id", eliminar_vehiculo);

async function todos_vehiculo (req,res,next){
    try {
        const items= await controlador.todos_vehiculo('vehiculos'); 
        respuestas.success(req, res, items, 200)
    } catch (err) {
        next(err);
    }
}
async function un_vehiculo (req,res,next){
    try {
        const items= await controlador.un_vehiculo('vehiculos',req.params.Car_Usu_NUA); 
        respuestas.success(req, res, items, 200)
    } catch (err) {
        next(err);
    }
}
async function agregar_vehiculo (req,res,next){
    try {
        const items= await controlador.agregar_vehiculo('vehiculos',req.body); 
        respuestas.success(req, res, 'Agregado satisfactoriamente', 200)
    } catch (err) {
       next(err);
    }
}
async function actualizar_vehiculo (req,res,next){
    try {
        const items= await controlador.actualizar_vehiculo('vehiculos',req.body,req.params.id); 
        respuestas.success(req, res, 'Actualizado con exito', 200)
    } catch (err) {
       next(err);
    }
}

async function eliminar_vehiculo (req,res,next){
    try {
        const items= await controlador.eliminar_vehiculo('vehiculos',req.params.id); 
        respuestas.success(req, res, 'eliminado satisfactoriamente', 200)
    } catch (err) {
        next(err);
    }
}

module.exports=router;
