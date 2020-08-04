const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'fallo en la autentificación'
        })
    }

}
function checkRole(rolesArray) {
    return (req, res, next) => {
        try {
            if (rolesArray.indexOf(req.userData.role) > -1) {
                next()
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'No tienes autorización a este recurso'
                })
            }
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'No tienes autorización a este recurso'
            })
        }
    }

}

module.exports = { checkAuth, checkRole }