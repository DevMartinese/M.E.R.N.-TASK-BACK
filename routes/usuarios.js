//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check} = require('express-validator');

//Se crea un usuario
//Api/usuarios
router.post('/',
   [
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     check('email', 'Agrega un mail valido').isEmail(),
     check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6})
   ],
   usuarioController.crearUsuario
);

module.exports = router;