const express = require('express');
const respuestas= require('../red/respuestas')
const controlador = require('../controlador/controlador');
const authController = require('../controlador/authController');
const jwtUtil = require('../utilidades/jwtUtil');
const { compararContrasena } = require('../utilidades/bcryptUtil');
const router= express.Router()

router.get('/',todos_usuario);
router.get('/:Usu_NUA', un_usuario);
router.post('/',agregar_usuario);
router.put('/:id',actualizar_usuario);
router.delete('/:id',eliminar_usuario);
router.post('/login',iniciar_sesion);

async function todos_usuario (req,res,next){
    try {
        //console.log('@@@ body ', req.body)
        const items= await controlador.todos_usuario('usuarios'); 
        respuestas.success(req, res, items, 200)
    } catch (err) {
        next(err);
    }
}

async function iniciar_sesion(req, res, next) {
    const { Usu_NUA, Usu_Password} = req.body;

    try {
        const usuario = await authController.iniciar_sesion('usuarios', { Usu_NUA, Usu_Password });
        
        if (usuario.error) {
            // Si la propiedad "error" está presente en el objeto retornado, significa que ocurrió un error al iniciar sesión.
            console.log("AYUDA: ",usuario.error);
            return res.status(401).json({ mensaje: usuario.error });
        }

        if (!usuario) {
            console.log("AYUDA: ",usuario.error);
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const token = jwtUtil.generarToken(usuario);
        console.log('token', token)
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        next(error);
        return res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function un_usuario (req,res,next){
    try {
        const items= await controlador.un_usuario('usuarios',req.params.Usu_NUA); 
        respuestas.success(req, res, items, 200)
    } catch (err) {
        next(err);
    }   
}
async function agregar_usuario (req,res,next){
    try {
        const items= await controlador.agregar_usuario('usuarios',req.body); 
        respuestas.success(req, res, items+' Agregado satisfactoriamente', 200)
    } catch (err) {
        next(err);
    }
}

async function actualizar_usuario (req,res,next){
    try {
        const items= await controlador.actualizar_usuario('usuarios',req.body,req.params.id); 
        respuestas.success(req, res, items+' Actualizado con exito', 200)
    } catch (err) {
        next(err);
    }
}
async function eliminar_usuario (req,res,next){
    try {
        const items= await controlador.eliminar_usuario('usuarios',req.params.id); 
        respuestas.success(req, res, items+' Eliminado satisfactoriamente', 200)
    } catch (err) {
        next(err);
    }
}
module.exports=router;
