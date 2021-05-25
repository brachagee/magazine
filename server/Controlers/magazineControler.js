const Magazine = require('../Models/MagazineModel')
const User = require('../Models/UserModel')
const Category = require('../Models/CategoryModel')

async function addNewMagazine(req, res) {
    try {
        console.log("addNewMagazine")
        let newMagazine = new magazine(req.body)
        console.log(newMagazine)
        let currentUser = await User.findById(req.params.userId)
        console.log(currentUser)
        await currentUser.magazines.push(newMagazine._id)
        console.log("recepies length " + currentUser.magazines.length + " newMagazine._id " + newMagazine._id)
        await newMagazine.save()
        await currentUser.save()

        console.log("new magazine " + newMagazine)
        res.status(200).json({ newMagazine: newMagazine, currentUser: currentUser })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function addNewPost(req, res) {
    try {
        //push to:new magazine
        //new category
        console.log("enter to addNewPost")
        const newPost = new post(req.body)
        console.log(newPost)
        postMagazine = await Magazine.findById(req.body.magazine)
        PostCategory = await Category.findById(req.body.category)
        postMagazine.posts.push(newPost._id)
        PostCategory.posts.push(newPost._id)
        await newPost.save()
        res.status(200).json({ newPost: newPost })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function addNewCategory(req, res) {
    try {
        console.log("addNewCategory");
        const newCategory = new category(req.body);
        await newCategory.save();
        res.status(200).json({ newCategory: newCategory })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function editMagazine(req, res) {
    console.log("editMagazine")
    let magazine = await Recipe.findByIdAndUpdate(req.body._id, req.body, { new: true })
    magazine.save()
        .then(() => {
            res.status(200).json(recipe)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

async function deleteMagazine(req, res) {
    console.log("deleteMagazine")
    let magazineIdToDelete = req.params.magazine_id
    let userEmailToDelete = req.params.email
    let user = User.findOne({ email: userEmailToDelete }).
    then(user.magazines.findByIdAndDelete(magazineIdToDelete))
        .then(() => {
            res.status(200).send(magazineIdToDelete + " id deleted succesfuly")
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

module.exports = { deleteRecipe, editRecipe, addNewRecipe }