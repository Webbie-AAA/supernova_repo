const {Router } = require('express');
const router = Router();

const userController = require('../controllers/user.js')

//router.get('/')
//router.get('/register', userController.register);
router.post('/login',userController.login);

module.exports = router;