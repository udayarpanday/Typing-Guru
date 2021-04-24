// Validations Helpers
const {check}=require('express-validator');

//Register Validation
exports.validRegister = [
    check('name', 'Name is required').notEmpty()
    .isLength({
        min: 4,
        max: 32
    }).withMessage('Name must be between 4 to 32 characters'),
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number')
]

//Login Validation
exports.validLogin=[
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password','Enter your password').notEmpty(),
    check('password').isLength({
        min:6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('Your password must contain a number')
]

//Forget Password Validation
exports.forgotPasswordValidation=[
    check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Must be a valid email address')
];

//Reset Password Validation
exports.resetPasswordValidator=[
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({min:6})
        .withMessage('Password must contain at least 6 characters')
]