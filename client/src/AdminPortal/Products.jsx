import React from 'react';

import Sidebar from './UIComp/Sidebar';
import AddProducts from './Components/AddProducts';
import ViewProducts from './Components/ViewProducts';
import Topbar from './UIComp/Topbar';

export default function Products() {
    
    return (
        <>
            <div className='w-full flex bg-gray-200'>
                <Sidebar />
                <div className='w-4/5 flex flex-col justify-center items-center'>
                    <Topbar/>
                    <h2 className='text-3xl my-4 w-full text-center bg-gray-400 text-white font-bold py-1'>
                        PRODUCTS PALLET
                    </h2>
                    <AddProducts/>
                    <ViewProducts/>
                </div>
            </div>


        </>
    );
}
