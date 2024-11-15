const mysql = require('mysql');
const config = require('../config');

const [host, port] = config.mysql.host.split(':');

const dbconfig = {
    host: host,
    port: port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let conexion;

function conMysql() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err) {
            console.error('[db error]', err);
            setTimeout(conMysql, 2000); // Reintentar la conexión después de 2 segundos
        } else {
            console.log('Conexión a la base de datos exitosa');
        }
    });

    conexion.on('error', (err) => {
        console.error('Error en la base de datos', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }
    });
}
conMysql();

//Usuarios
function todos_usuario(tabla) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}
function un_usuario(tabla, Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE Usu_NUA = ${Usu_NUA}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function agregar_usuario(tabla, data) {
    return new Promise((resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ?`, data , (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
    
}
function actualizar_usuario(tabla, data, Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`UPDATE ${tabla} SET ? WHERE Usu_NUA = ?`,[data, Usu_NUA] , (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function eliminar_usuario(tabla, Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`DELETE FROM ${tabla} WHERE Usu_NUA = ${Usu_NUA}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })}

//Vehiculos
function todos_vehiculo(tabla) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}
function un_vehiculo(tabla, Car_Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE Car_Usu_NUA = ${Car_Usu_NUA}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function agregar_vehiculo(tabla, data) {
    return new Promise((resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ?`, data , (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
    
}
function actualizar_vehiculo(tabla, data, Car_Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`UPDATE ${tabla} SET Car_Modelo = ?, Car_anio = ?, Car_Placas = ?, Car_Capacidad = ?, Car_Color = ? WHERE Car_Usu_NUA = ?`,
        [data.Car_Modelo, data.Car_anio, data.Car_Placas, data.Car_Capacidad,data.Car_Color, Car_Usu_NUA] , (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function eliminar_vehiculo(tabla, Car_Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`DELETE FROM ${tabla} WHERE Car_Usu_NUA = ${Car_Usu_NUA}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })}


// Calificacion
function un_Usuario_Calificacion (tabla, Cal_Califica_Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE Cal_Califica_Usu_NUA=${Cal_Califica_Usu_NUA}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
}

function validar_Calificación(Cal_Califica_Usu_NUA, Cal_Via_Id) {
    return new Promise((resolve, reject) => {
        conexion.query(`
        SELECT 
            (SELECT COUNT(*) FROM calificaciones WHERE Cal_Califica_Usu_NUA = ${Cal_Califica_Usu_NUA} AND Cal_Via_Id = ${Cal_Via_Id}) AS cal_count,
            (SELECT via_activo FROM viajes WHERE via_Id = ${Cal_Via_Id}) AS via_activo,
            (SELECT COUNT(*) FROM reservas WHERE Res_Usu_NUA = ${Cal_Califica_Usu_NUA} AND Res_via_id = ${Cal_Via_Id}) AS res_count`, 
        (error, result) => {
            if (error) {
                return reject(error);
            }
            const { cal_count, via_activo, res_count } = result[0];
            resolve({ cal_count, via_activo, res_count });
        });
    });
}

async function insertar_Calificación(data) {
    try {
        const { cal_count, via_activo, res_count } = await validar_Calificación(data.Cal_Califica_Usu_NUA, data.Cal_Via_Id);
        
        if (cal_count > 0) {
            return console.log("El usuario ya ha calificado este viaje.");
        }
        if (via_activo == 1) {
            return console.log("El viaje aún no ha terminado.");
        }
        if (res_count == 0) {
            return console.log("El usuario no tiene una reservación para este viaje.");
        }
        
        conexion.query(`
        INSERT INTO calificaciones (Cal_Califica_Usu_NUA, Cal_Via_Id, Cal_Calificado_Usu_NUA, Cal_Comentario, Cal_Calificacion)
        VALUES (${data.Cal_Califica_Usu_NUA}, ${data.Cal_Via_Id}, ${data.Cal_Calificado_Usu_NUA}, '${data.Cal_Comentario}', ${data.Cal_Calificacion})`, 
        (error, result) => {
            if (error) {
                return console.error("Error al insertar la calificación:", error);
            }
            console.log("Calificación insertada con éxito. =>", result);
        });

    } catch (error) {
        console.error("Error al validar la calificación:", error);
    }
}

// ====================== Viajes ======================
function todos_los_viajes(tabla) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function registrar_viaje(tabla, data) {
    return new Promise((resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ?`, data , (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
}

function viajes_conductor(via_con_usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM viajes WHERE via_con_usu_NUA = ${via_con_usu_NUA}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function eliminar_viaje(via_Id) {
    return new Promise((resolve, reject) =>{
        conexion.query(`DELETE FROM viajes WHERE via_Id = ${via_Id}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function verificarExistenciaReserva(data) {
    return new Promise((resolve, reject) => {
        conexion.query(`
            SELECT COUNT(*) AS count
            FROM reservas
            WHERE Res_Usu_NUA = ${data.Res_Usu_NUA} AND Res_via_id = ${data.Res_via_id}`, 
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result[0].count > 0);
            });
    });
}

// Historial
function historialConductor (Cal_Califica_Usu_NUA) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT viajes.via_fecha_hora, calificaciones.Cal_Califica_Usu_NUA, viajes.via_origen, viajes.via_destino, viajes.via_costo, calificaciones.Cal_Calificacion, viajes.via_activo
        FROM viajes
        INNER JOIN calificaciones ON viajes.via_Id = calificaciones.Cal_Via_Id
        WHERE viajes.via_con_usu_NUA = ${Cal_Califica_Usu_NUA}`;

        conexion.query(query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

//Reservar viajes
function todos_reservas() {
    return new Promise((resolve, reject) => {
        conexion.query(`
            SELECT 
                r.Res_Id AS ReservaID,
                r.Res_Usu_NUA AS UsuarioNUA,
                r.Res_Num_Asientos AS NumAsientos,
                v.via_Id AS ViajeID,
                v.via_fecha_hora AS FechaHora,
                v.via_con_usu_NUA AS Conductor,
                v.via_origen AS Origen,
                v.via_destino AS Destino,
                v.via_costo AS Costo,
                v.via_activo AS Activo,
                (SELECT COUNT(*) FROM calificaciones WHERE Cal_Califica_Usu_NUA = r.Res_Usu_NUA AND Cal_Via_Id = v.via_Id) AS TieneCalificacion
            FROM 
                reservas r
            JOIN 
                viajes v ON r.Res_via_id = v.via_Id;
        `, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
}


async function reservar_viaje(data) {
    try {
        // Verificar si el usuario ya tiene una reserva para este viaje
        const existeReserva = await verificarExistenciaReserva(data);
        if (existeReserva) {
            console.log("El usuario ya tiene una reserva para este viaje.");
            return;
        }
        // Insertar la reserva en la base de datos
        conexion.query(`
            INSERT INTO reservas (Res_Usu_NUA, Res_via_id, Res_Num_Asientos)
            VALUES (${data.Res_Usu_NUA}, ${data.Res_via_id}, ${data.Res_Num_Asientos})`, 
            (error, result) => {
                if (error) {
                    console.error("Error al insertar la reserva:", error);
                    return;
                }
                console.log("Reserva insertada con éxito. =>", result);
            });

    } catch (error) {
        console.error("Error al insertar la reserva:", error);
    }
}   

function historialPasajero (Cal_Califica_Usu_NUA) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT viajes.via_fecha_hora, calificaciones.Cal_Calificado_Usu_NUA, viajes.via_origen, viajes.via_destino, viajes.via_costo, calificaciones.Cal_Calificacion
        FROM viajes
        INNER JOIN calificaciones ON viajes.via_Id = calificaciones.Cal_Via_Id
        WHERE calificaciones.Cal_Califica_Usu_NUA = ${Cal_Califica_Usu_NUA}`;

        conexion.query(query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

function actualizarViajeStatus (via_Id) {
    return new Promise((resolve, reject) => {
        const query = `
        UPDATE viajes
        SET via_activo = 0
        WHERE via_Id = ${via_Id}`;
        conexion.query(query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
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
    /*iniciar_sesion,*/
    un_Usuario_Calificacion,
    validar_Calificación,
    insertar_Calificación,
    todos_los_viajes,
    todos_reservas,
    reservar_viaje,
    registrar_viaje,
    viajes_conductor,
    eliminar_viaje,
    verificarExistenciaReserva,
    //Historial
    historialConductor,
    historialPasajero,
    actualizarViajeStatus
}