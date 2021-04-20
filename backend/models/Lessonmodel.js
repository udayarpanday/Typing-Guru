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
        type:String,
        default:Date
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    completed:{
      type:String,
      default:"false"
    }

  },
);
// lessons schema
const Lessons = new mongoose.Schema(
  {
    lessontype:{
      type:String
    },
    lessonname:{
        type:String
    },
    lessondetails:{
        type:String
    },
    stats:[statsSchema],
  }
);

// virtual


module.exports = mongoose.model('Lessons', Lessons);
// module.exports = mongoose.model('Stats', statsSchema);