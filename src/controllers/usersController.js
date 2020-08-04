const usersController = {};
var userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendResetPasswordEmail } = require('../functions/mailing');
const { response } = require('express');



usersController.getusers = (req, res) => {


}

usersController.generateTokenToUser = (req, res) => {
    userModel.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length <= 1) {
                return res.status(401).json({
                    success: false,
                    message: 'fallo en la autentificación'
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: 'fallo en la autentificación'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        name:user.name,
                        email: user.email,
                        id: user._id,
                        role: user.role
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '2h'
                        }
                    )
                    return res.status(200).json({
                        success: true,
                        message: 'atentificación válida',
                        token: token
                    })
                }
                return res.status(401).json({
                    success: false,
                    message: 'fallo en la autentificación'
                })
            })
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: 'fallo en la autentificación'
            })
        })

}

usersController.createuser = (req, res) => {
    const { name, email, password } = req.body;
    userModel.find({ email: email }).exec()
        .then(user => {
            if (user.lenght >= 1) {
                return res.status(409).json({
                    success: false,
                    message: 'fallo en la autentificación'
                })
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new userModel({
                            name,
                            email,
                            password: hash,
                            //by default all users at first will have this role
                            role: 'USER'
                        })
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    success: true,
                                    message: 'usuario creado'
                                })
                            })
                            .catch(error => {
                                if (error.code === 11000) {
                                    return res.status(500).json({
                                        success: false,
                                        message: 'Este correo ya está registrado'
                                    })
                                } else {
                                    return res.status(500).json({
                                        success: false,
                                        message: 'No se pudo guardar el usuario'
                                    })
                                }
                            })
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                error: error
            })
        })




}

usersController.updateuser = (req, res) => {

}

usersController.deleteuser = (req, res) => {
    userModel.findByIdAndDelete(req.params.id).exec()
        .then(response => {
            res.status(200).json({
                success: true,
                message: 'usuario eliminado'
            })
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                error: error
            })
        })
}

usersController.getUser = (req, res) => {
    userModel.findOne({ email: req.params.email })
        .then(response => {
            res.json({
                name: response.name,
                email: response.email,

            })
        })
        .catch(error => {
            res.json({
                success: false,
                messasge: 'No se encontró el usuario'
            })
        })

}

usersController.sendLinkRestoreUserPassword = (req, res) => {
    
    userModel.findOne({ email: req.body.email })
        .then(user => {
            
            if (user !== null) {
                
                const token = jwt.sign({
                    email: user.email,
                    id: user._id,
                    role: user.role
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '2h'
                    }
                )
                const linkToReset = req.body.url + '/restore/?token=' + token
                //code to send email to user with the linkToReset
                
                const result=sendResetPasswordEmail(linkToReset, user.email)
                res.json(result)

                
            } else {
                res.json({
                    success: false,
                    message: 'Este email no está asociado con una cuenta registrada',
                })
            }

        })
        .catch(error => {
            res.json({
                success: false,
                messasge: 'No se pudo enviar el correo'
            })
        })

}

usersController.restoreUserPassword = (req, res) => {
    const password = req.body.password;
    const email = req.userData.email;
    
    userModel.findOne({ email: email }).exec()
        .then(user => {
            
            if (user.lenght < 1) {
                return res.status(409).json({
                    success: false,
                    message: 'fallo en la autentificación'
                })
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    
                    if (err) {
                        
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        userModel.findOneAndUpdate({ email: email }, {
                            password: hash
                        })
                            .then(result => {
                                res.status(201).json({
                                    success: true,
                                    message: 'Contraseña guardada'
                                })
                            })
                            .catch(error => {
                                res.status(500).json({
                                    success: false,
                                    message: 'No se pudo guardar la contraseña'
                                })
                            })
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                error: error
            })
        })

}

module.exports = usersController;


