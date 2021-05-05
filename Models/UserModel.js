const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
        
    },
    name:{
        type:String,
        require:true
        
    },
    recepies:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Recipe'
    }]
})
module.exports=mongoose.model('User',userSchema)