const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title:{
        type:String,
        minlength:3,
        trin:true
    }
})

const List = mongoose.model('List', ListSchema);

module.exports = List;
