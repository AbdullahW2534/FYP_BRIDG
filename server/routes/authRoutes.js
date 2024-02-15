import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/User.js';

const router = express.Router();


router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10).then(hash => {
        userModel.create({ name, email, password: hash })
            .then(user => { res.json({ status: "OK" }) })
            .catch(err => res.json(err))
    }).catch(err => res.json(err))
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const jwtToken = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: '1d' });
                        res.cookie('token', jwtToken);
                        return res.json({ Status: "Success", role: user.role , name: user.name});
                    }
                    else {
                        return res.json("Password Didn't match..!");
                    }
                })
            }
            else {
                return res.json("No Record Found");
            }
        }).catch(err => res.json(err))
})

router.post('/logout', (req, res) => {
    res.clearCookie('token').json('Logged out successfully');
});

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
                req.email = decoded.email; 
                next();
            }
        });
    }
}

router.get('/getMail', verifyUser, (req, res) => {
    const email = req.email;
    return res.json({ email: email });
})

router.get('/getUserName', (req, res) => {
    
    const email = req.query.email
    userModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ name: user.name });
        })
        .catch(error => {
            console.error('Error Fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});




export default router;