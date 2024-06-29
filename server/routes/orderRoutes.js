import express from 'express';
import gigsModel from '../models/Gig.js';
import ordersModel from '../models/Order.js';
import userModel from '../models/User.js';
import cloudinary from "../utils/cloudinary.js";
import upload from "../middleware/multer.js";
import jwt from 'jsonwebtoken';
import axios from 'axios'
const router = express.Router();


router.post('/placeOrder', upload.none(), async (req, res) => {
    try {

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing" });
        }
        const decoded = jwt.verify(token, "jwt-secret-key");
        const userId = decoded.id;
        const newOrder = await ordersModel.create({
            title: req.body.title,
            price: req.body.price,
            deliveryTime: req.body.deliveryTime,
            gigUser: req.body.gigUser,
            taskHead: userId,
            taskDescription: req.body.taskDescription,
            paymentReference: req.body.paymentReference,
            message: req.body.message,
            redirecturl: req.body.redirecturl,
            status: req.body.status,
            trans: req.body.trans,
            transaction: req.body.transaction,
            trxref: req.body.trxref,

        });

        res.json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
router.post('/refund', async (req, res) => {
    try {
        const { transaction } = req.body;

       console.log(transaction);
        const response = await axios.post(
            `https://api.paystack.co/refund`,
            { transaction },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

       
        console.log('Paystack Refund Response:', response.data);

   
        res.json({ message: 'Refund initiated' });
    } catch (error) {
        console.error('Refund Error:', error);
    }
});

router.get('/getOrders', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Authentication token is missing" });
    }
    const decoded = jwt.verify(token, "jwt-secret-key");
    const userId = decoded.id;
    ordersModel.find({ gigUser: userId })
        .populate('taskHead gigUser', 'name email')
        .then(Orders => res.json(Orders))
        .catch(error => {
            console.error('Error Fetching Orders:', error);
            res.status(500).json({ message: 'Internal server error' });
        })
});

router.get('/getOrdersInvestor', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Authentication token is missing" });
    }
    const decoded = jwt.verify(token, "jwt-secret-key");
    const userId = decoded.id;
    ordersModel.find({ taskHead : userId })
        .populate('taskHead gigUser', 'name email')
        .then(Orders => res.json(Orders))
        .catch(error => {
            console.error('Error Fetching Orders:', error);
            res.status(500).json({ message: 'Internal server error' });
        })
});

router.put('/updateOrderStatus/:orderId', upload.none(), async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        console.log(orderId, status, "data");
        const updatedOrder = await ordersModel.findByIdAndUpdate(orderId, { orderStatus: status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/getAllGigs', (req, res) => {
    gigsModel.find()
        .populate('user', 'name image') // Populate the 'user' field with 'name' field from UserModel
        .then(gigs => { res.json(gigs) })
        .catch(error => {
            console.error('Error Fetching gigs:', error);
            res.status(500).json({ message: 'Internal server error' });
        })
});
export default router;