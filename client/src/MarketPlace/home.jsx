import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Products from './components/products'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addProducts } from '../features/product/productsSlice';
import ProductsPage from './Test/ProductsPage';

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get('http://localhost:3001/prod/getProducts')
            .then(res => {
                dispatch(addProducts(res.data));
                // setProducts(res.data)
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <>
            <div className='w-full h-auto flex flex-col justify-start items-center'>
                <Navbar/>
                <Products/>
                <ProductsPage/>
               
            </div>
        </>
    )
}

