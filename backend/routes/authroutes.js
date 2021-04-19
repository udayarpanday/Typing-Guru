const express = require ('express');
const router = express.Router();

//validation
const{
    validRegister,
    validLogin,
    forgotPasswordValidation,
    resetPasswordValidator
}=require('../helpers/validation')

//Load Controllers
const{
    registerController,
    activationController,
    loginController,
    forgetPasswordController,
    resetPasswordController,
    googleController

}=require('../controllers/authcontroller.js');


router.post('/register',validRegister,registerController)
router.post('/activation', activationController)
router.post('/login', validLogin,loginController)
router.put('/forgotpassword',forgotPasswordValidation,forgetPasswordController)
router.put('/resetpassword',resetPasswordController)
router.post('/googlelogin',googleController)
module.exports=router;