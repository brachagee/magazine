const router = require("express").Router();
const user = require("../Controlers/userControler")
const recipe = require("../Controlers/recipeControler");

router.post('/register', user.register);
router.get('/signIn', user.signIn);
router.get('/getRecipes/:email', user.getRecepies);
router.patch('/updateUser', user.updateUser);
router.post('/addNewRecipe/:userId', recipe.addNewRecipe);
router.patch('/editRecipe', recipe.editRecipe);
router.delete('/deleteRecipe/:id', recipe.deleteRecipe);


module.exports = router;