const bcrypt = require('bcrypt');

// Función para encriptar la contraseña
const encriptarContrasena = async (contrasena) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(contrasena, saltRounds);
    return hash;
};

// Función para comparar contraseñas
const compararContrasena = async (contrasena, contrasenaEncriptada) => {
    return await bcrypt.compare(contrasena, contrasenaEncriptada);
};

// Función para hacer el hash de la contraseña
const hashContrasena = async (contrasena) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(contrasena, saltRounds);
    return hash;
};

// Agregar un console.log para verificar que hashContrasena está disponible
console.log('hashContrasena:', hashContrasena);

module.exports = {
    encriptarContrasena,
    compararContrasena,
    hashContrasena  // Exporta la función
};