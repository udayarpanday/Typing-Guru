const mongoose = require('mongoose');
// stats schema
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


module.exports = mongoose.model('Stats', statsSchema);
