const express = require('express');
const router = express.Router();

//IMPORTATION CONTROLLER
const UserController = require('../controllers/user.controller');


router.post('/register', UserController.register);
router.post('/login',UserController.login);


module.exports = router;