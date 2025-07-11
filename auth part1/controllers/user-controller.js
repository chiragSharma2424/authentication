import User from '../models/user-model.js';
import crypto from 'crypto'

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
        })
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
            })
        }


        // how we can send verification token to user, using mail
        // send mail 
        
    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            msg: "internal server error"
        })
    }
}