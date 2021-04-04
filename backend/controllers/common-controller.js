const Test =require('../models/Test.js')
const User = require('../models/authmodel');
const expressJwt =require('express-jwt')
const Lessons=require('../models/Lessonmodel')

//Custom error handler to handle database errors
const {errorHandler}=require('../helpers/dbErrorHandling')

const { result } = require('lodash')

exports.insertLessons = (req,res)=>{
    console.log(req.body);
    lessons = new Lessons(req.body)
  
    lessons.save(function(err) {
        console.log("Callback");
             if (err) {
              console.log("error");
             throw err;
    }
       console.log('added !');
    res.send("ok");
   });
}
exports.getLessons = (req,res)=>{
    Lessons.find().exec((err,data)=>{
        res.json(data);
    });
}
exports.getOneLessons = (req,res)=>{

    Lessons.findOne({_id:req.params.id}).exec((err,data)=>{
        res.json(data);
    });
}
exports.getText = (req, res) => {
    User.find().exec((err, data) => {
        res.json(data)
    });
};

exports.getText = (req, res) => {
    Lessons.find().exec((err, data) => {
        res.json(data)
    });
};

