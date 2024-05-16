import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addProducts } from '../features/product/productsSlice';
import Outlets from './components/Outlets';
import ProductsPalet from './components/ProductsPalet';
import Blogs from './Blogs/Blogs';
import HomeBlogs from './components/HomeBlogs';
import Footer from './components/Footer';
import Policy from './components/Policy';
import Partners from './components/Partners';



export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/getProducts`)
            .then(res => {
                dispatch(addProducts(res.data));
                // setProducts(res.data)
            })
            .catch(err => console.log(err));
    }, []);
       
    return (
        <>
            <div className='w-full h-auto flex flex-col justify-start items-center'>
                <Navbar backgroundImage="bg-[url('./assets/images/bg.jpg')]"  heading={'SOLESTYLE'} />
                <Outlets/>
                <ProductsPalet/>
                <Policy/>
                <HomeBlogs/>
                <Partners/>
                <Footer/>
            </div>
        </>
    )
}

