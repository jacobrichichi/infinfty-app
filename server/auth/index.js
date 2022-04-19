const jwt = require("jsonwebtoken")
const jwt_secret = require('../config/keys').jwt_secret

function authManager() {
    verify = (req, res, next) => {
        try {
            console.log('verify 1')
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "Unauthorized"
                })
            }

            const verified = jwt.verify(token, jwt_secret)
            
            req.userId = verified.userId;

            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                loggedIn: false,
                user: null,
                errorMessage: "Unauthorized"
            });
        }
    }

    verifyUser = (req) => {
        try {
            console.log('verifyUser 2')
            const token = req.cookies.token;
            if (!token) {
                return null;
            }

            const decodedToken = jwt.verify(token, jwt_secret);
            return decodedToken.userId;
        } catch (err) {

            return null;
        }
    }

    signToken = (userId) => {
        console.log(userId)
        return jwt.sign({
            userId: userId
        }, jwt_secret);
    }

    return this;
}

const auth = authManager();
module.exports = auth;