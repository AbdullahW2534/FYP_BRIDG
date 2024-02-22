import React from 'react';

import Sidebar from './UIComp/Sidebar';
import ViewProducts from './Components/ViewProducts';
import Topbar from './UIComp/Topbar';
import AddCategory from './Components/AddCategory';
import AddPosts from './Components/AddPosts';

export default function Posts() {
    
    return (
        <>
            <div className='w-full flex bg-gray-200'>
                <Sidebar />
                <div className='w-4/5 flex flex-col justify-start items-center'>
                    <Topbar/>
                    <h2 className='text-3xl my-4 w-full text-center bg-gray-400 text-white font-bold py-1'>
                        MARKETPLACE POSTS
                    </h2>
                    <AddPosts/>
                    <AddCategory/>
                    <ViewProducts/>
                </div>
            </div>


        </>
    );
}
