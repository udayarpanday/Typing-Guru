const mongoose = require('mongoose');
// text for typing test schema
const Test = new mongoose.Schema(
  {
    texts: {
      type: String
    },
  },
);


module.exports = mongoose.model('Test', Test);