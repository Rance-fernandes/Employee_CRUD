const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User not authorized");
            }
            console.log(decoded);
            req.user = decoded.user; // Attach decoded user info to request object
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        res.status(401);
        throw new Error("Authorization header missing or invalid");
    }
});

module.exports = validateToken;
