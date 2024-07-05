import express from 'express';
import gigsModel from '../models/Gig.js';
import ordersModel from '../models/Order.js';
import categorysModel from '../models/Categories.js';
import userModel from '../models/User.js';
import cloudinary from "../utils/cloudinary.js";
import upload from "../middleware/multer.js";
import jwt from 'jsonwebtoken';

const router = express.Router();


router.post('/uploadGig', upload.single('file'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const imageUrl = result.secure_url;
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing" });
        }
        const decoded = jwt.verify(token, "jwt-secret-key");
        const userId = decoded.id;

        const newGig = await gigsModel.create({
            title: req.body.title,
            description: req.body.description,
            keywords: req.body.keywords,
            deliveryTime: req.body.deliveryTime,
            price: req.body.price,
            category: req.body.category,
            link: req.body.link,
            image: imageUrl,
            user: userId
        });

        res.json(newGig);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.get('/getGigs', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Authentication token is missing" });
    }
    const decoded = jwt.verify(token, "jwt-secret-key");
    const userId = decoded.id;
    gigsModel.find({ user: userId })
        .then(gig => res.json(gig))
        .catch(error => {
            console.error('Error Fetching gig:', error);
            res.status(500).json({ message: 'Internal server error' });
        })
});


router.get('/getAllGigs', async (req, res) => {
    const searchByTitle = req.query.searchByTitle;
    const searchByAssistant = req.query.searchByAssistant;
    const searchByCategory = req.query.searchByCategory;
    const filter = {};

    if (searchByTitle) {
        filter.title = { $regex: searchByTitle, $options: 'i' };
    }

    if (searchByCategory) {
        filter.category = { $regex: searchByCategory, $options: 'i' };
    }

    try {
        if (searchByAssistant) {
            const assistants = await userModel.find({ name: { $regex: searchByAssistant, $options: 'i' } });
            if (assistants.length > 0) {
                const assistantIds = assistants.map(assistant => assistant._id);
                filter.user = { $in: assistantIds };
            } else {
                return res.json([]);
            }
        }

        const gigs = await gigsModel.find(filter)
            .populate('user', 'name image email');

        res.json(gigs);
    } catch (error) {
        console.error('Error fetching gigs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





export default router;
