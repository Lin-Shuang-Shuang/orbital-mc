const jsonwebtoken = require("jsonwebtoken");
require('dotenv').config();

const verifyUser = async (socket, next) => {
    if (socket.handshake.query) {
        const attempt = jsonwebtoken.decode(socket.handshake.query.token);
        console.log(attempt);
        jsonwebtoken.verify(socket.handshake.query.token, process.env.SECRET, function(error, decoded) {
            if (error) {
                return next(new Error("Authentication error"))
            }
            socket.user = attempt.id;
            next();
        }); 
    } else {
        console.log("Error");
    }
    
}

module.exports = {verifyUser};