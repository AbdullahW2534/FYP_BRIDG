import express from 'express';
import productsModel from '../models/Images.js';
import ordersModel from '../models/Order.js';
import categorysModel from '../models/Categories.js';
import multer from "multer";
import path from "path";

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
});

router.post('/uploadProducts', upload.single('file'), (req, res) => {
    productsModel.create({ productName: req.body.productName, productPrice: req.body.productPrice, productCategory: req.body.productCategory,productQuantity:req.body.productQuantity,productColors:req.body.productColors,productSizes:req.body.productSizes, image: req.file.filename })
        .then(result => res.json(result))
        .catch(err => console.log(err))
});

router.put('/editProduct/:productId', upload.single('file'), (req, res) => {
    const productId = req.params.productId;
    productsModel.findByIdAndUpdate(productId, {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productCategory: req.body.productCategory,
        image: req.file.filename
    }, { new: true })
        .then(updatedProduct => {
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(updatedProduct);
        })
        .catch(error => {
            console.error('Error updating product:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.get('/getProducts', (req, res) => {
    productsModel.find()
        .then(product => res.json(product))
        .catch(error => {
            console.error('Error Fetching product:', error);
            res.status(500).json({ message: 'Internal server error' });
        })
});

router.delete('/deleteProduct/:productId', (req, res) => {
    const productId = req.params.productId;
    productsModel.findByIdAndDelete(productId)
        .then(deletedProduct => {
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully', deletedProduct });
        })
        .catch(error => {
            console.error('Error deleting product:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.post('/order',upload.none(), (req, res) => {
    console.log("Order",req.body);
    ordersModel.create({ productName: req.body.productName, productPrice: req.body.productPrice, customerName: req.body.customerName,productColor: req.body.productColor,productSize: req.body.productSize,quantity: req.body.quantity,email:req.body.email})
        .then(result => {
            console.log("Order server : ",result);
            res.json(result)})
        .catch(err => console.log(err))
});

router.get('/getOrders/:sessionUser', (req, res) => {
    const email = req.params.sessionUser;
    // console.log("Server : ", email);
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    
    ordersModel.find({ email: email })
        .then(orderDetail => res.json(orderDetail))
        .catch(error => {
            console.error('Error Fetching Order:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});
router.get('/getOrderByID/:trackingID', (req, res) => {
    const trackingID = req.params.trackingID;
    console.log("Server : ", trackingID);
    ordersModel.find({ _id: trackingID })
        .then(orderDetail => res.json(orderDetail))
        .catch(error => {
            console.error('Error Fetching Order:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});



router.post('/uploadCategory',upload.none(),(req, res) => {
    // console.log(req.body);
    categorysModel.create({ categoryName: req.body.categoryName})
        .then(result => res.json(result))
        .catch(err => console.log(err))
});

export default router;
