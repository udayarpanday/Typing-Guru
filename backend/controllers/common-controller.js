const Test =require('../models/Test.js')
const User = require('../models/authmodel');
const expressJwt =require('express-jwt')
const Lessons=require('../models/Lessonmodel')


exports.insertLessons = (req,res)=>{
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
    Lessons.find().exec((err, data) => {
        res.json(data)
    });
};

exports.updateStats=(req,res)=>{
    const{speed,accuracy,time,date}=req.body
    var stats={"Speed":speed,"Accuracy":accuracy,"Time":time,date}
    Lessons.findOne({_id:req.params.id}).exec((err,data)=>{
        data.stats.push(stats)
        console.log(data)
        data.save((err,updatedStats)=>{
            if (err) {
                console.log('Stats UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            res.json(updatedStats);
        })
    })
}

