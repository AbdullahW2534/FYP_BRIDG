import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from "../utils/cloudinary.js";
import upload from "../middleware/multer.js"
import userModel from '../models/User.js';

const router = express.Router();


router.post('/register', upload.single('file'), async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;
    bcrypt.hash(req.body.password, 10).then(hash => {
        userModel.create({ name: req.body.name, email: req.body.email, role: req.body.role, password: hash, image: imageUrl })
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
                        const jwtToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: '1d' });
                        res.cookie('token', jwtToken);
                        return res.json({ Status: "Success", name: user.name, role: user.role, image: user.image, email: user.email });
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
            res.json({ name: user.name, role: user.role, image: user.image, email: user.email });
        })
        .catch(error => {
            console.error('Error Fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.put('/accountsettings', upload.single('file'), async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Authentication token is missing" });
    }

    try {
        const decoded = jwt.verify(token, "jwt-secret-key");
        const userId = decoded.id;
        let updatedFields = {};

        
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            updatedFields.image = result.secure_url;
        }

        
        if (req.body.oldPassword) {
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Old password didn't match" });
            }
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
            updatedFields.password = hashedPassword;
        }

        
        if (req.body.name) {
            updatedFields.name = req.body.name;
        }

       
        const updatedUser = await userModel.findByIdAndUpdate(userId, updatedFields, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ status: "OK", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



export default router;