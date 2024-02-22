import React from 'react';

export default function TrackTable({ postsData }) {
    
    return (
        <table className='w-full'>
                <thead>
                    <tr>
                        <th className='px-4 py-2 bg-red-600 text-white font-medium rounded-tl-lg'>Customer Name</th>
                        <th className='px-4 py-2 bg-red-600 text-white font-medium '>Email</th>
                        <th className='px-4 py-2 bg-red-600 text-white font-medium '>Product Name</th>
                        <th className='px-4 py-2 bg-red-600 text-white font-medium '>Quantity</th>
                        <th className='px-4 py-2 bg-red-600 text-white font-medium '>Product Size</th>
                        <th className='px-4 py-2 bg-red-600 text-white font-medium '>Product Color</th>
                        <th className='px-4 py-2 bg-red-600 text-white font-medium rounded-tr-lg'>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {postsData.map(post => (
                        <tr key={post._id} className='bg-white border-b text-center border-red-600'>
                            <td className='p-2'>{post.customerName}</td>
                            <td className='p-2'>{post.email}</td>
                            <td className='p-2'>{post.productName}</td>
                            <td className='p-2'>{post.quantity}</td>
                            <td className='p-2'>{post.productSize}</td>
                            <td className='p-2'>{post.productColor}</td>
                            <td className='p-2'>{post.orderStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    )
}
