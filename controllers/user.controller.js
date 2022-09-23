const userService = require("../services/user.services");


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

//         app.get('/user/:email', jwtVerify, async (req, res) => {
//             const email = req.params.email;
//             const query = { email };
//             const result = await userCollection.findOne(query);
//             res.send(result);
//         });

//         app.put('/user/admin/:email', jwtVerify, verifyAdmin, async (req, res) => {
//             const email = req.params.email;
//             const filter = { email };
//             const updateDoc = {
//                 $set: {
//                     role: `admin`
//                 },
//             };
//             const result = await userCollection.updateOne(filter, updateDoc);
//             res.send(result);
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
        if (result.modifiedCount) {
            res.send(result)
        } else {
            res.send("something wrong")
        }
    } catch (error) {
        res.send("Something Wrong")
    }
}