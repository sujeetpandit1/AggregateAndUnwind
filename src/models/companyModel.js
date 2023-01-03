const mongoose = require('mongoose')
const autoIncrement = require ('mongoose-sequence')(mongoose);


const companySchema = new mongoose.Schema({

    _id: Number,

    companyName:{
        type:String,
        required: true,
        trim:true
    },
    URL:{
        type: String,
        required: true,
        lowercase:true,
        trim:true
    }


},{ _id: false });


companySchema.plugin(autoIncrement)
module.exports=mongoose.model('Company', companySchema)