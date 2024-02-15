import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/User.js';

const router = express.Router();

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("Token Not Found");
    }
    else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) {
                return res.json("Error in Token Verification");
            }
            else {
                if (decoded.role === 'admin') {
                    next();
                }
                else {
                    return res.json("Not Admin");
                }
            }
        });
    }
}

router.get('/dashboard', verifyUser, (req, res) => {
    res.json('Success');
})



export default router;