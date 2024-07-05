import React from 'react';
import Navbar from '../components/Navbar';
import Heading from '../components/heading';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <>
      <div className='w-full flex flex-col justify-center items-center'>
        <Navbar backgroundImage="bg-[url('./assets/images/bg8.jpg')]" heading={'CONTACT US'} />
        <div className='w-full flex flex-col justify-center items-center mb-10'>
          <Heading heading={'Stay IN TOUCH'} mainHeading={'CONNECT WITH US'} />
          <div className='p-10 w-full flex flex-col items-center justify-center text-black'>
            <div className='flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-6'>
              <img 
                src="./contactus.jpg" 
                alt="Contact Us" 
                className="w-full md:w-1/2 rounded-lg mb-6 md:mb-0 md:mr-6"
              />
              <form className='w-full md:w-1/2 flex flex-col'>
                <label className='mb-2 text-gray-700' htmlFor="name">Name</label>
                <input className='mb-4 p-2 border rounded-lg' type="text" id="name" name="name" />
                
                <label className='mb-2 text-gray-700' htmlFor="email">Email</label>
                <input className='mb-4 p-2 border rounded-lg' type="email" id="email" name="email" />

                <label className='mb-2 text-gray-700' htmlFor="phone">Phone</label>
                <input className='mb-4 p-2 border rounded-lg' type="text" id="phone" name="phone" />

                <label className='mb-2 text-gray-700' htmlFor="address">Address</label>
                <input className='mb-4 p-2 border rounded-lg' type="text" id="address" name="address" />

                
                <label className='mb-2 text-gray-700' htmlFor="message">Message</label>
                <textarea className='mb-4 p-2 border rounded-lg' id="message" name="message" rows="4"></textarea>
                
                <button className='bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600' type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
