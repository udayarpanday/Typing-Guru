const Test =require('../models/Test.js')
const expressJwt =require('express-jwt')

//Custom error handler to handle database errors
const {errorHandler}=require('../helpers/dbErrorHandling')

const { result } = require('lodash')

exports.getText = (req, res) => {
    Test.find({}).removeAsync()
    .then(()=>{
        Test.create({
            text:'asd asdf asdfd'
        })
    })
};