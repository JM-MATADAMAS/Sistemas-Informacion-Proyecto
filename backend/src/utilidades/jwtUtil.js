const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
    const payload = {
        id: usuario.id,
        email: usuario.email
        // Puedes agregar más información según tus necesidades
    };

    const token = jwt.sign(payload, 'secreto', { expiresIn: '1h' }); // 'secreto' debe ser reemplazado por una cadena secreta real

    return token;
};

const verificarToken = (token) => {
    return jwt.verify(token, 'secreto');
};

module.exports = {
    generarToken,
    verificarToken
};