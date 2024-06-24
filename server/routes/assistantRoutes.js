import express from 'express';
import gigsModel from '../models/Gig.js';
import ordersModel from '../models/Order.js';
import categorysModel from '../models/Categories.js';
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
    gigsModel.find()
        .then(gig => res.json(gig))
        .catch(error => {
            console.error('Error Fetching gig:', error);
            res.status(500).json({ message: 'Internal server error' });
        })
});
// router.put('/editProduct/:productId', upload.single('file'), async (req, res) => {
//     const productId = req.params.productId;
//     const result = await cloudinary.uploader.upload(req.file.path);
//     const imageUrl = result.secure_url;
//     productsModel.findByIdAndUpdate(productId, {
//         productName: req.body.productName,
//         productPrice: req.body.productPrice,
//         productCategory: req.body.productCategory,
//         image: imageUrl
//     }, { new: true })
//         .then(updatedProduct => {
//             if (!updatedProduct) {
//                 return res.status(404).json({ message: 'Product not found' });
//             }
//             res.json(updatedProduct);
//         })
//         .catch(error => {
//             console.error('Error updating product:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         });
// });

// router.get('/getProducts', (req, res) => {
//     productsModel.find()
//         .then(product => res.json(product))
//         .catch(error => {
//             console.error('Error Fetching product:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         })
// });

// router.post('/deleteProduct/:productId', (req, res) => {
//     const productId = req.params.productId;
//     productsModel.findByIdAndDelete(productId)
//         .then(deletedProduct => {
//             if (!deletedProduct) {
//                 return res.status(404).json({ message: 'Product not found' });
//             }
//             res.json({ message: 'Product deleted successfully', deletedProduct });
//         })
//         .catch(error => {
//             console.error('Error deleting product:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         });
// });

// router.post('/order',upload.none(), (req, res) => {
//     console.log("Order",req.body);
//     ordersModel.create({ productName: req.body.productName, productPrice: req.body.productPrice, customerName: req.body.customerName,productColor: req.body.productColor,productSize: req.body.productSize,quantity: req.body.quantity,email:req.body.email})
//         .then(result => {
//             console.log("Order server : ",result);
//             res.json(result)})
//         .catch(err => console.log(err))
// });

// router.get('/getOrders/:sessionUser', (req, res) => {
//     const email = req.params.sessionUser;
//     // console.log("Server : ", email);
//     if (!email) {
//         return res.status(400).json({ message: 'Email is required' });
//     }

//     ordersModel.find({ email: email })
//         .then(orderDetail => res.json(orderDetail))
//         .catch(error => {
//             console.error('Error Fetching Order:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         });
// });
// router.get('/getOrderByID/:trackingID', (req, res) => {
//     const trackingID = req.params.trackingID;
//     console.log("Server : ", trackingID);
//     ordersModel.find({ _id: trackingID })
//         .then(orderDetail => res.json(orderDetail))
//         .catch(error => {
//             console.error('Error Fetching Order:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         });
// });



// router.post('/uploadCategory', (req,res) => {
//     categorysModel.create({ categoryName: req.body.categoryName })
//         .then(result => res.json(result))
//         .catch(err => console.log(err))
// });


// router.get('/getCategories', (req, res) => {
//     categorysModel.find()
//         .then(categories => res.json(categories))
//         .catch(error => {
//             console.error('Error Fetching categories:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         })
// });

// router.put('/editCategory/:categoryID', async (req, res) => {
//     console.log(req.body);
//     const categoryID = req.params.categoryID;
//     categorysModel.findByIdAndUpdate(categoryID, {
//         categoryName: req.body.categoryName,
//     }, { new: true })
//         .then(updatedCategory => {
//             if (!updatedCategory) {
//                 return res.status(404).json({ message: 'Category not found' });
//             }
//             res.json(updatedCategory);
//         })
//         .catch(error => {
//             console.error('Error updating Category:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         });
// });

// router.post('/deleteCategory/:categoryID', (req, res) => {
//     const categoryID = req.params.categoryID;
//     categorysModel.findByIdAndDelete(categoryID)
//         .then(deletedCategory => {
//             if (!deletedCategory) {
//                 return res.status(404).json({ message: 'Category not found' });
//             }
//             res.json({ message: 'Category deleted successfully', deletedCategory });
//         })
//         .catch(error => {
//             console.error('Error deleting Category:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         });
// });

export default router;
