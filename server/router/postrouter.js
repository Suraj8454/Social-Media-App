const router = require('express').Router();
const postcontroller= require('../controllers/postcontroller');
const requirerouter=require('../middleware/requierUser')


router.get('/all',requirerouter,postcontroller.getallpostcontroller);


module.exports=router;