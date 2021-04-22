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
    const{speed,accuracy,time,date,completed,user_id}=req.body
    console.log(user_id)
    var stats={"Speed":speed,"Accuracy":accuracy,"Time":time,date,"user_id":user_id,"completed":completed}
    Lessons.findOne({_id:req.params.id}).exec((err,data)=>{
        data.stats.push(stats)
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

exports.getStats = (req,res)=>{
    const {id} = req.params;
    let items={push:function push(element){ [].push.call(this,element)}};

    Lessons.find({}).exec((err,data)=>{
        // console.log(data);
        data.map((lessons=>{
            lessons.stats.forEach(function(element){
                console.log((element.user_id),(id))
               if(String(element.user_id)===id){               
                    items.push({stats:element,lessons:lessons.lessonname})
               }
               else{
                console.log('hi')
               }
            })
        }))
    res.json(items)
    })
    
}



