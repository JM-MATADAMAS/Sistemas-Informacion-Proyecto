const express = require('express');
const respuestas = require('../red/respuestas');
const controlador = require('../controlador/controlador');
const authController = require('../controlador/authController');
const jwtUtil = require('../utilidades/jwtUtil');
const { compararContrasena, hashContrasena } = require('../utilidades/bcryptUtil');  // Asegúrate de que hashContrasena esté importado
const router = express.Router();

// Rutas principales
router.get('/', todos_usuario);
router.get('/:Usu_NUA', un_usuario);
router.post('/', agregar_usuario);
router.put('/:id', actualizar_usuario);
router.delete('/:id', eliminar_usuario);
router.post('/login', iniciar_sesion);
router.post('/:id/reset_password', reset_password); // Nueva ruta para restablecer contraseña

// Obtener todos los usuarios
async function todos_usuario(req, res, next) {
    try {
        const items = await controlador.todos_usuario('usuarios');
        respuestas.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
}

// Iniciar sesión
async function iniciar_sesion(req, res, next) {
    const { Usu_NUA, Usu_Password } = req.body;

    try {
        const usuario = await authController.iniciar_sesion('usuarios', { Usu_NUA, Usu_Password });

        if (usuario.error) {
            return res.status(401).json({ mensaje: usuario.error });
        }

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const token = jwtUtil.generarToken(usuario);
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        next(error);
        return res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

// Obtener un usuario por NUA
async function un_usuario(req, res, next) {
    try {
        const items = await controlador.un_usuario('usuarios', req.params.Usu_NUA);
        if (!items || items.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }
        respuestas.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
}

// Agregar un usuario
async function agregar_usuario(req, res, next) {
    try {
        const items = await controlador.agregar_usuario('usuarios', req.body);
        respuestas.success(req, res, items + ' Agregado satisfactoriamente', 200);
    } catch (err) {
        next(err);
    }
}

// Actualizar un usuario
async function actualizar_usuario(req, res, next) {
    try {
        const items = await controlador.actualizar_usuario('usuarios', req.body, req.params.id);
        respuestas.success(req, res, items + ' Actualizado con éxito', 200);
    } catch (err) {
        next(err);
    }
}

// Eliminar un usuario
async function eliminar_usuario(req, res, next) {
    try {
        const items = await controlador.eliminar_usuario('usuarios', req.params.id);
        respuestas.success(req, res, items + ' Eliminado satisfactoriamente', 200);
    } catch (err) {
        next(err);
    }
}

// Resetear la contraseña del usuario
async function reset_password(req, res, next) {
    try {
        const items = await controlador.reset_password('usuarios', req.body.Usu_Password, req.params.id);
        respuestas.success(req, res, items + ' Contraseña actualizada con éxito', 200);
    } catch (err) {
        next(err);
    }
}

module.exports = router;