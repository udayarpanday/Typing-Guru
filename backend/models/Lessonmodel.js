const mongoose = require('mongoose');
// user schema
const Lessons = new mongoose.Schema(
  {
    lessonname:{
        type:String
    },
    lessondetails:{
        type:String
    }
  }
);

// virtual


module.exports = mongoose.model('Lessons', Lessons);