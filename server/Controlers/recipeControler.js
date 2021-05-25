const Recipe = require('../Models/RecipeModel')
const User = require('../Models/UserModel')

async function addNewRecipe(req, res) {
    console.log("addNewRecipe")
    let newRecipe = await new Recipe(req.body)
    console.log(newRecipe)
    let currentUser = await User.findById(req.params.userId)
    console.log(currentUser)
    await currentUser.recepies.push(newRecipe._id)
    console.log("recepies length " + currentUser.recepies.length + " newRecipe._id " + newRecipe._id)
    newRecipe.save()
    currentUser.save()
        .then(() => {
            console.log("new recepy "+newRecipe)
            res.status(200).json({ newRecepy: newRecipe,currentUser:currentUser })
        }).catch(err => {
            console.log(err.message)
            res.status(500).send(err)
        })

}

async function editRecipe(req, res) {
    console.log("editRecipe")
    let recipe = await Recipe.findByIdAndUpdate(req.body._id, req.body, { new: true })
    recipe.save()
        .then(() => {
            res.status(200).json(recipe)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

async function deleteRecipe(req, res) {
    console.log("deleteRecipe")
    let recipeIdToDelete = req.params.recipe_id
    let userEmailToDelete=req.params.email
    let user=User.findOne({ email: userEmailToDelete }).
    then(user.recepies.findByIdAndDelete(recipeIdToDelete))
        .then(() => {
            res.status(200).send(recipeIdToDelete + " id deleted succesfuly")
        })
        .catch((err) => {
            res.status(500).send(err)
        }
        )
}

module.exports = { deleteRecipe, editRecipe, addNewRecipe }