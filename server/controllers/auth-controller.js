const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

registerUser = async (req, res) => {
    try {
        let { firstName, lastName, userName, email, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !userName || !email || !password || !passwordVerify) {
            return res
                .status(200)
                .json({ success: false, errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(200)
                .json({
                    success: false,
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(200)
                .json({
                    success: false,
                    errorMessage: "Please enter the same password twice."
                })
        }
        let existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res
                .status(200)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        existingUser = await User.findOne({ userName: userName.toLowerCase() });
        if (existingUser) {
            return res
                .status(200)
                .json({
                    success: false,
                    errorMessage: "An account with this username already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        userName = userName.toLowerCase()
        email = email.toLowerCase()

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            wallet: 'a',
            userName: userName,
            email: email,
            passwordHash: passwordHash,
            auctions: [],
        });

        const savedUser = await newUser.save();

        return res.status(200).json({
            success: true
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}


loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({
                success: false, 
                errorMessage: "Please enter all required fields." 
            });
        }
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (!existingUser) {
            return res.status(200).json({
                success: false,
                errorMessage: "Wrong email or password provided."
            })
        }
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            console.log("Incorrect password");
            return res.status(200).json({
                success: false,
                errorMessage: "Wrong email or password provided."
            })
        }
        // LOGIN THE USER
        const token = auth.signToken(existingUser._id);
        var now = new Date()
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(now.getFullYear(), now.getMonth()+1, now.getDay()),
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,  
                userName: existingUser.userName,
                email: existingUser.email,
                _id: existingUser._id,
                hasWallet: existingUser.wallet !== 'a',      
                wallet: existingUser.wallet,
                twofactorsecret: !!existingUser.twofactorsecret,
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

loginUserById = async (req, res) => {
    console.log('loginUserById hi')
    User.findOne({ _id: req.params.id }, (err, existingUser) => {
        return res.status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,  
                userName: existingUser.userName,
                email: existingUser.email,
                hasWallet: existingUser.wallet !== 'a',      
                wallet: existingUser.wallet,
                twofactorsecret: !!existingUser.twofactorsecret,
            }
        })
    })
}

// Remove the wallet from database on logout to correspond with disconnecting from Pera Wallet
// this needs to be GET, pass in params. req.params.id is not passed into auth same way its passed to nft
logoutUser = async (req, res) => {
    console.log('logoutUser')
    User.findOne({ _id: req.params.id }, (err, user) => {
        if(err){
            return res.status(400).json({
                success: false,
                error: 'The subject user was not found'
            })
        }

        // wallet being a means user has no wallet
        user.wallet = "a";
        user.save().then(() => {
            res.cookie("token", "", {
                httpOnly: true,
                expires: new Date(0),
                secure: true,
                sameSite: "none"
            }).send();
        }).catch(error => {
            res.cookie("token", "", {
                httpOnly: true,
                expires: new Date(0),
                secure: true,
                sameSite: "none"
            }).send();
        })
    })
}

refreshUser = async (req, res) => {
    try {
        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }
        const existingUser = await User.findOne({ _id: userId });
        return res.status(200).json({
            loggedIn: true,
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,  
                userName: existingUser.userName,
                email: existingUser.email,
                _id: existingUser._id,
                hasWallet: existingUser.wallet !== 'a',      
                wallet: existingUser.wallet,
                twofactorsecret: !!existingUser.twofactorsecret,
            }
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

getLoggedIn = async (req, res) => {
    try {
        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }
        const loggedInUser = await User.findOne({ _id: userId });
        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email,
                twofactorsecret: !!loggedInUser.twofactorsecret,
            }
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

updateUser = async (req, res) => {
    try {
        const body = req.body;
        
        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }  

        const existingUser = await User.findOne({ _id: userId });
        
        existingUser.firstName = body.firstName;
        existingUser.lastName = body.lastName;
        existingUser.userName = body.userName;
        existingUser.email = body.email;

        existingUser
        .save()
        .then(() => {
            console.log("SUCCESS!!!");
            console.log(req)
            return res.status(200).json({
                success: true,
                id: user._id,
                message: 'User information updated!',
            })
        })
        .catch(error => {
            console.log("FAILURE: " + JSON.stringify(error));
            return res.status(404).json({
                error,
                message: 'User information not updated!',
            })
        })
    }
    catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

updatePassword = async (req, res) => {
    try {
        console.log("updatepassword reached")
        const { password, newPassword } = req.body;

        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }  

        const existingUser = await User.findOne({ _id: userId });

        // Chec if newPassword meets requirements (8 characters or more)
        if (newPassword.length < 8) {
            console.log("New password doesn't meet requirements");
            return res.status(200).json({
                success: false,
                errorMessage: "New password must be 8 characters in length."
            })
        }

        // Check if current password in first field is correct
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            console.log("Incorrect password");
            return res.status(200).json({
                success: false,
                errorMessage: "Wrong current password provided."
            })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        existingUser.passwordHash = passwordHash;

        existingUser
        .save()
        .then(() => {
            console.log("PASSWORD SUCCESS!!!");
            return res.status(200).json({
                success: true,
                id: user._id,
                message: 'User password updated!',
            })
        })
        .catch(error => {
            console.log("FAILURE: " + JSON.stringify(error));
            return res.status(404).json({
                error,
                message: 'User password not updated!',
            })
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    registerUser,
    loginUser,
    loginUserById,
    logoutUser,
    getLoggedIn,
    refreshUser,
    updateUser,
    updatePassword
}