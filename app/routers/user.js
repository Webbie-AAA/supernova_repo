const { Router } = require('express');
const userController = require('../controllers/user')
const userRouter = Router();


//router.get('/')
//router.get('/register', userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/register", userController)


module.exports = userRouter;
