import express from 'express';
import servicesModel from '../models/services.js';
import ordersModel from '../models/Order.js';
import categorysModel from '../models/Categories.js';
import cloudinary from "../utils/cloudinary.js";
import upload from "../middleware/multer.js";


const router = express.Router();


router.post('/uploadService', upload.single('file'), async (req, res) => {

    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;
    console.log(req.body.serviceDescription,"Body");
    servicesModel.create({ serviceName: req.body.serviceName, serviceDescription: req.body.serviceDescription, serviceCategory: req.body.serviceCategory, image: imageUrl })
        .then(result => res.json(result))
        .catch(err => console.log(err))
});

router.put('/editservice/:serviceId', upload.single('file'), async (req, res) => {
    const serviceId = req.params.serviceId;
    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;
    servicesModel.findByIdAndUpdate(serviceId, {
        serviceName: req.body.serviceName,
        servicePrice: req.body.servicePrice,
        serviceCategory: req.body.serviceCategory,
        image: imageUrl
    }, { new: true })
        .then(updatedservice => {
            if (!updatedservice) {
                return res.status(404).json({ message: 'service not found' });
            }
            res.json(updatedservice);
        })
        .catch(error => {
            console.error('Error updating service:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.get('/getServices', (req, res) => {
    servicesModel.find()
        .then(service => res.json(service))
        .catch(error => {
            console.error('Error Fetching service:', error);
            res.status(500).json({ message: 'Internal server error' });
        })
});

router.post('/deleteservice/:serviceId', (req, res) => {
    const serviceId = req.params.serviceId;
    servicesModel.findByIdAndDelete(serviceId)
        .then(deletedservice => {
            if (!deletedservice) {
                return res.status(404).json({ message: 'service not found' });
            }
            res.json({ message: 'service deleted successfully', deletedservice });
        })
        .catch(error => {
            console.error('Error deleting service:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.post('/order', upload.none(), (req, res) => {
    console.log("Order", req.body);
    ordersModel.create({ serviceName: req.body.serviceName, servicePrice: req.body.servicePrice, customerName: req.body.customerName, serviceColor: req.body.serviceColor, serviceSize: req.body.serviceSize, quantity: req.body.quantity, email: req.body.email })
        .then(result => {
            console.log("Order server : ", result);
            res.json(result)
        })
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



router.post('/uploadCategory', (req, res) => {
    categorysModel.create({ categoryName: req.body.categoryName })
        .then(result => res.json(result))
        .catch(err => console.log(err))
});


router.get('/getCategories', (req, res) => {
    categorysModel.find()
        .then(categories => res.json(categories))
        .catch(error => {
            console.error('Error Fetching categories:', error);
            res.status(500).json({ message: 'Internal server error' });
        })
});

router.put('/editCategory/:categoryID', async (req, res) => {
    console.log(req.body);
    const categoryID = req.params.categoryID;
    categorysModel.findByIdAndUpdate(categoryID, {
        categoryName: req.body.categoryName,
    }, { new: true })
        .then(updatedCategory => {
            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json(updatedCategory);
        })
        .catch(error => {
            console.error('Error updating Category:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.post('/deleteCategory/:categoryID', (req, res) => {
    const categoryID = req.params.categoryID;
    categorysModel.findByIdAndDelete(categoryID)
        .then(deletedCategory => {
            if (!deletedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json({ message: 'Category deleted successfully', deletedCategory });
        })
        .catch(error => {
            console.error('Error deleting Category:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

export default router;
