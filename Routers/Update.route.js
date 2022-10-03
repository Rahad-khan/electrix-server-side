const { Router } = require('express');
const User = require('../models/UsersModel');

const router = Router();
// app.put('/updateProfile/:email', jwtVerify, async (req, res) => {
//     const email = req.params.email;
//     const doc = req.body;
//     const filter = { email };
//     const updateDoc = {
//         $set: doc
//     };
//     const result = await userCollection.updateOne(filter, updateDoc);
//     res.send(result);
// });

router.put('/:email', async (req, res) => {
    const { email } = req.params;
    const doc = req.body;
    const result = await User.findOneAndUpdate({ email }, { $set: doc }, { new: true, rawResult: true });
    console.log(result)
    res.send(result);
})

module.exports = router;