import express from 'express';
import postsModel from '../models/Posts.js'
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

router.post('/uploadPosts', upload.single('file'), (req, res) => {
    // console.log("Request : ", req.body);
    postsModel.create({heading : req.body.heading,auther: req.body.auther,content: req.body.content,image: req.file.filename  })
        .then(result => res.json(result))
        .catch(err => console.log(err))
});

router.get('/getPosts', (req, res) => {
    postsModel.find()
        .then(post => {
            console.log("Post",post);
            res.json(post)
        })
        .catch(error => {
            console.error('Error Fetching Posts:', error);
            res.status(500).json({ message: 'Internal server error' });
        })
});




// router.put('/editProduct/:productId', upload.single('file'), (req, res) => {
//     const productId = req.params.productId;
//     productsModel.findByIdAndUpdate(productId, {
//         productName: req.body.productName,
//         productPrice: req.body.productPrice,
//         productCategory: req.body.productCategory,
//         image: req.file.filename
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


// router.delete('/deleteProduct/:productId', (req, res) => {
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



export default router;
