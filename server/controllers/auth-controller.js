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
            firstName, lastName, userName, email, passwordHash
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

module.exports = {
    registerUser
}