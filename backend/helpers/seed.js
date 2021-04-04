const assert=require('assert')
const Test =require('../models/Test.js')

describe('Saving records',function(){
    it('Save test texts to the database',function(done){
        var char=new Test({
            text:'aas asdad asdfasd a'
        });
        char.save().then(function(){
            assert(char.isNew===false);
            done();

        })
    })
    
})