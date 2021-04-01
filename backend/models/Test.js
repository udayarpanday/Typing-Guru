const mongoose = require('mongoose');
// user schema
const Test = new mongoose.Schema(
  {
    texts: {
      type: Array
    },
  },
);


module.exports = mongoose.model('Test', Test);