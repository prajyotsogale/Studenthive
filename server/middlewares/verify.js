const jwt = require("jsonwebtoken")
require('dotenv').config();


module.exports.verifyJWT = async (req, res, next) => {
    try {
        
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        

        req.user = decoded;
        console.log(req.user)
     
        next()
    }
    catch (error) {
        res.status(401).json({ msg:"Unauthorized Access" })
    }
}

module.exports.verifyAdmin = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.id.role !== "host") {
            return res.status(401).json({ msg: "your are not a host" })
        }

        req.user = decoded;
        next()
    }
    catch (error) {
        res.status(401).json({ msg: "Unauthorized Access" })
    }
}