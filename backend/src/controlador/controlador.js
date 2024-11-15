const db= require('../db/mysql')
const bcryptUtil = require('../utilidades/bcryptUtil');
const jwtUtil = require('../utilidades/jwtUtil');

//Usuarios
function todos_usuario(tabla){
    return db.todos_usuario(tabla)
}
function un_usuario(tabla, id){
    return db.un_usuario(tabla, id)
}

async function agregar_usuario(tabla,body){
    //console.log('@@@ body controlador ', body)
    try {
        // Encriptar la contraseña
        const contrasenaEncriptada = await bcryptUtil.encriptarContrasena(body.Usu_Password);
        
        // Reemplazar la contraseña en texto plano por la contraseña encriptada
        const data = {
            ...body,
            Usu_Password: contrasenaEncriptada
        };

        // Agregar el usuario con la contraseña encriptada
        const resultado = await db.agregar_usuario(tabla, data);
        
        return resultado;
    } catch (error) {
        throw error;
    }
}

async function actualizar_usuario(tabla,body,id){
    try {
        // Encriptar la contraseña
        const contrasenaEncriptada = await bcryptUtil.encriptarContrasena(body.Usu_Password);
        
        // Reemplazar la contraseña en texto plano por la contraseña encriptada
        const data = {
            ...body,
            Usu_Password: contrasenaEncriptada
        };

        // Agregar el usuario con la contraseña encriptada
        const resultado = await db.actualizar_usuario(tabla, data, id);
        
        return resultado;
    } catch (error) {
        throw error;
    }
    // return db.actualizar_usuario(tabla, body, id);
}

function eliminar_usuario(tabla,id){
    return db.eliminar_usuario(tabla, id);
}

//Vehiculos
function todos_vehiculo(tabla){
    return db.todos_vehiculo(tabla)
}
function un_vehiculo(tabla,id){
    return db.un_vehiculo(tabla, id)
}

function agregar_vehiculo(tabla,body){
    return db.agregar_vehiculo(tabla, body);
}

function actualizar_vehiculo(tabla,body,id){
    return db.actualizar_vehiculo(tabla, body, id);
}

function eliminar_vehiculo(tabla,id){
    return db.eliminar_vehiculo(tabla, id);
}

//Calificacion
function un_Usuario_Calificacion(tabla, Cal_Califica_Usu_NUA){
    return db.un_Usuario_Calificacion(tabla, Cal_Califica_Usu_NUA)
}

function validar_Calificación(Cal_Califica_Usu_NUA, Cal_Via_Id){
    return db.validar_Calificación(Cal_Califica_Usu_NUA, Cal_Via_Id)
}

function insertar_Calificación(data){
    console.log(data)
    return db.insertar_Calificación(data)
}

function todos_los_viajes(tabla){
    return db.todos_los_viajes(tabla)
}

function registrar_viaje(tabla, data){
    return db.registrar_viaje(tabla, data)
}


function viajes_conductor(via_con_usu_NUA){
    return db.viajes_conductor(via_con_usu_NUA)
}

function eliminar_viaje(via_Id){
    return db.eliminar_viaje(via_Id)
}

function reservar_viaje(data){
    return db.reservar_viaje(data)
}

function verificarExistenciaReserva(data){
    return db.verificarExistenciaReserva(data)
}

//Historial
function historialConductor (Cal_Califica_Usu_NUA) {
    return db.historialConductor (Cal_Califica_Usu_NUA);
}

function historialPasajero (Cal_Califica_Usu_NUA) {
    return db.historialPasajero (Cal_Califica_Usu_NUA);
}

function actualizarViajeStatus (via_Id) {
    return db.actualizarViajeStatus (via_Id);
}

//reservas
function todos_reservas(){
    return db.todos_reservas()
}

module.exports = {
    todos_usuario,
    un_usuario,
    agregar_usuario,
    actualizar_usuario,
    eliminar_usuario,
    todos_vehiculo,
    un_vehiculo,
    agregar_vehiculo,
    actualizar_vehiculo,
    eliminar_vehiculo,
    un_Usuario_Calificacion,
    validar_Calificación,
    insertar_Calificación,
    todos_los_viajes,
    todos_reservas,
    reservar_viaje,
    registrar_viaje,
    verificarExistenciaReserva,
    viajes_conductor,
    eliminar_viaje,
    historialConductor,
    historialPasajero,
    actualizarViajeStatus
}
