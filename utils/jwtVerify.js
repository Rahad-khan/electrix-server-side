const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtVerify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ mesaage: 'Unauthorized User' })
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decode) => {
        if (err) {
            return res.status(403).send({ mesaage: 'Forbidden Access' });
        }
        req.decode = decode;
        next();
    })
};


module.exports = jwtVerify;