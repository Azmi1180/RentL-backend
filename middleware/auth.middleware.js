// const jwt = require('jsonwebtoken');

// exports.protect = (req, res, next) => {
//     let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];
//     }

//     if (!token) {
//         return res.status(401).json({ error: 'Not authorized to access this route' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // const decoded = jwt.verify(token,"secret"); // Changed process.env.JWT
//         req.user_data = decoded; // Changed req.user to req.user_data
//         next();
//     } catch (error) {
//         res.status(401).json({ error: 'Token is not valid' });
//     }
// };

const { json } = require("body-parser")
const  jsonwebtoken  = require("jsonwebtoken")

console.log("bruh")

exports.protect = (req, res, next) => {
    // try{
        console.log(req.headers)
        console.log("bruh2")

        if(req.headers.authorization ){

            const token = req.headers.authorization.split(' ')[1]
            console.log("bruh3")

            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)

            req.user_data = decoded
            next()
        }else{
            return res.status(401).json({
                message: "RIIL Unauthorized"
            })
        }
    // }
    // catch{
    //     return res.status(401).json({
    //         message: "EMROR Unauthorized"
    //     })
    // }
}



