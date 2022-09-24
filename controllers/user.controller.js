const userService = require("../services/user.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// app.put('/user/:email', async (req, res) => {
//             const email = req.params.email;
//             const user = req.body;
//             const filter = { email };
//             const options = { upsert: true };
//             const updateDoc = {
//                 $set: user,
//             };
//             const result = await userCollection.updateOne(filter, updateDoc, options);
//             const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
//                 expiresIn: '1d'
//             });
//             res.send({ result, token: accessToken })
//         });


exports.getAllUser = async (req, res, next) => {
    try {
        const result = await userService.getUserServices();
        res.send(result);
    } catch (error) {
        res.status(404).send("Not found")
    }
};

exports.makeAdmin = async (req, res, next) => {
    try {
        const { email } = req.params;
        const result = await userService.makeAdminServices(email);

        res.send(result)

    } catch (error) {
        res.send("Something Wrong")
    }
}
exports.getUserByMail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const result = await userService.userByMailServices(email);
        if (result) {
            res.send(result);
        } else {
            res.send("User not found")
        }
    } catch (error) {
        res.status(404).send("Not found")
    }
};
exports.createUser = async (req, res, next) => {
    try {
        const user = req.body;
        const { email } = req.params;
        const result = await userService.createUserService(email, user);

        const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
            expiresIn: '1d'
        });
        res.send({ result, token: accessToken });
    } catch (error) {
        res.status(404).send("Not found")
    }
};