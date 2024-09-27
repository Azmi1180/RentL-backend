const { json } = require("body-parser")
const  jsonwebtoken  = require("jsonwebtoken")

console.log("bruh")

exports.protect = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            req.user_data = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                status: 401,
                message: "Token is not valid"
            });
        }
    } else {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized: No token provided"
        });
    }
};
