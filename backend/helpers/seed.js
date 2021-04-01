const Test =require('../models/Test.js')

Test.find({}).removeAsync()
.then(()=>{
    Test.create({
        text:["asd asdf asdfd","ababa","abadjbkjk"]
    });
});