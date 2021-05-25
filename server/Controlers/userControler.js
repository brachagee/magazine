const User = require('../Models/UserModel')
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')

dotenv.config();

const register = async (req, res) => {
    console.log("enter to register")
    try {
        let result = await User.findOne({
            email: req.body.email
        });

        if (result) {
            console.log(`email in use ${result}`)
            res.status(400).json({ message: "Failed! Email is already in use!" });
        }
        else {
            let newUser = new User(req.body)
            console.log(`new user ${newUser}`)
            await newUser.save()
            console.log("succes " + newUser)
            let token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET)
            let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            console.log(`token ${token}`)
            console.log(`decoded ${decoded}`)
            res.status(200).json({ "user": newUser, message: "user was registerd succesfuly", "token": token })
        }
    }
    catch (err) {
        console.log("error from catch" + err)
        res.status(500).json({ error: err.message, message: "cannot create new user" })
    }

}



const signIn = async (req, res) => {
    try {
        console.log("enter to sign in")
        const user = await User.findOne({
            email: req.body.email
            , password: req.body.password
        })
        if (user) {
            console.log(user)
            let token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET)
            let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            console.log(`token ${token}  decoded ${decoded}`)
            res.status(200).json({ "user": user, "token": token, message: "user was logged in succesfully" })
        }
        else
            res.status(400).json({ message: "Failed! Email does not exist pleese register first!" })
    }
    catch {
        (err) => {
            console.log(err + "catch sign in user")
            res.status(500).json({ error: err, message: "cannot sign in user " })
        }

    }
}

async function getRecepies(req, res) {
    try {
        console.log("enter to getRecepies")
        let user = await User.findOne({ email: req.params.email })
        console.log("user " + user)
        console.log("recepies " + user.recepies.length)
        console.log(user.recepies.populate('recepies'))
        res.status(200).json(user.recepies.populate('recepies'))
    }

    catch {
        (err) => {
            res.status(500).send({ error: err, message: "cannot find user recipes " })
        }
    }

}



async function updateUser(req, res) {
    console.log("enter to updateUser")
    try {
        User.findByIdAndUpdate(req.body._id, req.body, { new: true })
            .then((updateuser) => {
                res.status(200).json(updateuser)
            })
    } catch (error) {
        res.status(500).json({ "message": "canot update user", error: error })
    }
}
module.exports = { register, signIn, updateUser, getRecepies }
