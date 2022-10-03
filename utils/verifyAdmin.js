const User = require("../models/UsersModel");

//  Verify Admin
const verifyAdmin = async (req, res, next) => {
    const requester = req.decode.email;
    const requesterDetails = await User.findOne({ email: requester });
    console.log(`file: verifyAdmin.js ~ line 7 ~ verifyAdmin ~ requesterDetails`, requesterDetails)


    if (requesterDetails?.role === "admin") {
        next()
    } else {
        return res.status(403).send({ message: 'Forbidden Access' });
    }
};

module.exports = verifyAdmin;