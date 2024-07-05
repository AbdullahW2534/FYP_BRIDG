import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRouter from "./routes/authRoutes.js";
import dashRouter from "./routes/dashboardRoutes.js";
import servicesRouter from './routes/servicesRoutes.js';
import postRouter from "./routes/postsRoutes.js";
import assistantRouter from './routes/assistantRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";
import axios from 'axios';

const app = express();
app.use(express.json())
app.use(cors({
  origin: ['https://bridg-aws.vercel.app', 'http://localhost:5173','https://api.paystack.co/refund','https://api.paystack.co/balance'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));


app.use(express.static('public'))
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URL);

app.use('/auth', authRouter);
app.use('/dash', dashRouter);
app.use('/prod', servicesRouter);
app.use('/post', postRouter);
app.use('/assistant', assistantRouter);
app.use('/order', orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/coin-gecko', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Ethereum price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(3001, () => {
  console.log("Server is Running")
})




