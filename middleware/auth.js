const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Verificar si hay un token en el header de autorización
        const authHeader = req.get('Authorization');
        
        if (!authHeader) {
            return res.status(401).json({ msg: 'No autenticado, no hay JWT' });
        }

        // Obtener el token y verificarlo
        const token = authHeader.split(' ')[1];
        let revisarToken;

        revisarToken = jwt.verify(token, 'LLAVESECRETA');

        // Si el token no es válido
        if (!revisarToken) {
            return res.status(401).json({ msg: 'Token no válido o expirado' });
        }

        // Si todo está bien, continuar
        next();

    } catch (error) {
        // Enviar un error claro al cliente
        console.error(error);
        return res.status(500).json({ msg: 'Error en la autenticación', error: error.message });
    }
};
