const jwtUtil = require('../utilidades/jwtUtil');
const bcryptUtil = require('../utilidades/bcryptUtil');
const db = require('../db/mysql');
const respuestas= require('../red/respuestas')

async function iniciar_sesion(tabla, data) {
    console.log('NUA y contrasena', data)
    try {
        //const { nua, contrasena } = data;

        // Obtener usuario por NUA
        const usuarios = await db.un_usuario(tabla, data.Usu_NUA);
        console.log('usuario: ',usuarios)

        if (usuarios.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        const usuario = usuarios[0]; // Tomar el primer usuario (debería haber solo uno)

        // Verificar la contraseña
        //const contrasenaEncriptada = await bcryptUtil.encriptarContrasena(data.Usu_Password);
        const contrasenaValida = await bcryptUtil.compararContrasena(data.Usu_Password, usuario.Usu_Password);

        if (!contrasenaValida) {
            return { error: 'Contraseña incorrecta' };
        }

        // Generar token JWT
        const token = jwtUtil.generarToken(usuario);

        return token;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
iniciar_sesion
}
