//  Verify Admin
const verifyAdmin = async (req, res, next) => {
    const requester = req.decode.email;
    const requesterDetails = await userCollection.findOne({ email: requester });
    if (requesterDetails.role === "admin") {
        next()
    } else {
        return res.status(403).send({ mesaage: 'Forbidden Access' });
    }
};

module.exports = verifyAdmin;