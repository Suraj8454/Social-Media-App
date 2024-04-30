const router = require('express').Router();

const authController= require('../controllers/authController');

router.post('/signup',authController.singupcontroller)
router.post('/login',authController.logincontroller)
router.get('/refresh',authController.refreshAccessTokenController)

module.exports=router;