const mongoose = require('mongoose')

const userdetailsSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    
      cart: {
        type: Array,
        required: false
      },

});

const userdetails = mongoose.model('userdetails', userdetailsSchema);

module.exports = userdetails;