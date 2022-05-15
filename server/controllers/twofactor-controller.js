const twofactor = require("node-2fa");
const User = require("../models/user-model")
const auth = require("../auth")
/**
 * Handle the auth/twofactor path
 * Reponse message format {success: Boolean, message: String}
 */


/**
 * POST Create 2FA for User->username if DNE, give QR code
 * Request contains user's email
 */
 setup2FA = (req, res) => {
    const {email} = req.body;
    options={
        name: "Infinfty Marketplace",
        account: email
    }
    // Get user and update into db
    User.findOne({email: email}, (err, user) => {
        if(err){
            return res.status(200).json({
                success: false,
                message: 'Error: not found'
            });
        }
        if(!user.twofactorsecret){
            // User doesn't have 2FA setup
            // generate secret
            newSecret = twofactor.generateSecret(options);
            /*
            {   secret: 'XDQXYCP5AC6FA32FQXDGJSPBIDYNKK5W',
                uri: 'otpauth://totp/My%20Awesome%20App:johndoe?secret=XDQXYCP5AC6FA32FQXDGJSPBIDYNKK5W&issuer=My%20Awesome%20App',
                qr: 'https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=otpauth://totp/My%20Awesome%20App:johndoe%3Fsecret=XDQXYCP5AC6FA32FQXDGJSPBIDYNKK5W%26issuer=My%20Awesome%20App'
            }
            */
            user.twofactorsecret=newSecret.secret; // Must Encrypt for security
            // Update the user's data
            user.save().then((success)=>{
                twofactor.generateToken(user.twofactorsecret)
                return res.status(200).json({
                    success: true,
                    message: '2Factor Setup Success',
                    qrcode: newSecret.uri
                });
            }).catch((err) => {
                return res.status(200).json({
                    success: false,
                    message: "Couldn't setup 2Factor"
                });
            });
        }else{
            // User already has a 2FA setup
            // console.log('User has secret')
            return res.status(200).json({
                success: true,
                message: '2Factor Exists, Success',
                qrcode: `otpauth://totp/Infinfty%20Marketplace:${options.account}?secret=${user.twofactorsecret}&issuer=Infinfty%20Marketplace`
            });
        }
    });
}

/**
 * POST Verify 6-digit token. Response of (success, message)
 */
verifyTOTP = (req, res) => {
    const {email, totpToken} = req.body
    console.log([email, totpToken])
    User.findOne({email: email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }
        if(!user.twofactorsecret){
            return res.status(200).json({
                success: false,
                message: '2FA not setup for this user'
            });
        }else{
            delta=twofactor.verifyToken(user.twofactorsecret, totpToken);
            /*
            { delta: -1/1/0 } or null
            */

            if(!delta){
                return res.status(200).json({
                    success: false,
                    message: '2FA token mismatch'
                });
            }
            if(delta.delta==0){
                // success
                // console.log('2FA token a success')
                return res.status(200).json({
                    success: true,
                    message: 'Accepted token'
                });
            }else{
                return res.status(200).json({
                    success: false,
                    message: '2FA token mismatch'
                });
            }
        }
    });
}

del2FA = (req, res) => {
    const {email} = req.body;
    User.findOne({email: email}, (err, user) => {
        if(err){
            return res.status(200).json({
                success: false,
                message: 'Error: not found'
            })
        }
        user.twofactorsecret = null
        user.save().then((success) => {
            return res.status(200).json({
                success: true,
                message: '2FA gone'
            });
        }).catch((err) => {
            return res.status(200).json({
                success: false,
                message: 'Error removing 2FA'
            });
        });
    });
}

module.exports={
    setup2FA,
    del2FA,
    verifyTOTP
}