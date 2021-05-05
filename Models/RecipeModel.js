const mongoose=require("mongoose")

const recipeSchema=mongoose.Schema({
    recipe:{
        type:String,
        require:true
    },
    recipeName:{
        type:String,
        require:true
    }

})
module.exports=mongoose.model('Recipe',recipeSchema)