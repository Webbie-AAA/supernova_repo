const { Router } = require('express');
const router = Router();


router.post('/register', router.register);
router.post('/login', router.login);


module.exports = router