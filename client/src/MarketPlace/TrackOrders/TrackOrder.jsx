import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Heading from '../components/heading';
import TrackOne from './components/TrackOne';
import TrackAll from './components/TrackAll';
import Footer from '../components/Footer';

export default function TrackOrders() {


    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <Navbar backgroundImage="bg-[url('./assets/images/bg9.jpg')]" heading={'TRACKING'} />
                <div className='w-full flex flex-col justify-center items-center'>
                    <Heading heading={'GET IN TOUCH'} mainHeading={'TRACK THE ONE'} />
                    <TrackOne />
                    <Heading heading={'STAY UP-TO-DATE'} mainHeading={'TRACKING FOR YOU'} />
                    <TrackAll />

                </div>
                <Footer />
            </div>
        </>
    );
}
