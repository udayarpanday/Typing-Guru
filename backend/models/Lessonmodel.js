const mongoose = require('mongoose');
//stats Schema
const statsSchema = new mongoose.Schema(
  {
    Speed: {
        type: Number,
    },
    Accuracy:{
        type:Number,
    },
    Time:{
        type:Number,
    },
    Date:{
        type:Date,
        default:Date.now
    }
  },
);
// lessons schema
const Lessons = new mongoose.Schema(
  {
    lessonname:{
        type:String
    },
    lessontype:{
        type:String
    },
    lessondetails:{
        type:String
    },
    stats:[statsSchema]
  }
);

// virtual


module.exports = mongoose.model('Lessons', Lessons);