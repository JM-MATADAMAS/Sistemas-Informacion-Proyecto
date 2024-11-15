const bcrypt = require('bcrypt');

const encriptarContrasena = async (contrasena) => {
    //console.log('@@@ password ', contrasena)
    const saltRounds = 10;
    const hash = await bcrypt.hash(contrasena, saltRounds);
    //console.log("contraseña encriptada: ",hash);
    return hash;
};

const compararContrasena = async (contrasena, contrasenaEncriptada) => {
    /*console.log("contraseña encriptada: ",contrasenaEncriptada);
    console.log("contraseña: ",contrasena);*/
    return await bcrypt.compare(contrasena, contrasenaEncriptada)
};

module.exports = {
    encriptarContrasena,
    compararContrasena
};