import User from '../models/user-model.js';
import crypto from 'crypto';
import sendVerificationEmail from '../utils/sednMail-utils.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || password) {
        return res.status(400).json({
            success: false,
            msg: "all fields are required"
        })
    }

    if(password.length < 6) {
        return res.status(400).json({
            success: false,
            msg: "password must be atleast 6 characters"
        });
    }


    try {
        // checking user already exists or not in database
        const existingUser = await User.findOne({
            email
        });

        if(existingUser) {
            return res.status(400).json({
                success: false,
                msg: "user already exist in database"
            })
        }

        // now user verification token
        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = new Date.now() + 10 * 60 * 60 * 1000;

        // create a new user
        const user = await User.create({
            name,
            email,
            password,
            verificationToken: token,
            verificationTokenExpiry: tokenExpiry
        });


        if(!user) {
            return res.status(200).json({
                success: false,
                msg: "User not created"
            });
        }


        // how we can send verification token to user, using mail
        // send mail 

        await sendVerificationEmail(user.email, token);


        // final response to user
        return res.status(200).json({
            success: true,
            msg: "user registered successfully, now verify your email"
        });
        
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "internal server error"
        });
    }
}

// verify controller
export const verify = async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: {$gt: Date.now()},
        })

        if(!user) {
            return res.status(200).json({
                success: false,
                msg: "token invalid"
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            msg: "User account is verified"
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "internal server error"
        });
    }
}