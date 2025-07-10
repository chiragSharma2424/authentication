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
        
    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            msg: "internal server error"
        })
    }
}