import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrackTable from './TrackTable';
import TrackImg from './TrackImg';
function TrackOne() {
    const [status, setPosts] = useState([]);
    const [notify, setNotify] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const trackingID = event.target.elements.trackingID.value;
        console.log("Tracker : ", trackingID);
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/getOrderByID/${trackingID}`)
            .then(res => {
                setPosts(res.data);
                console.log(res.data[0]);
                event.target.reset();
            })
            .catch(err => {
                setNotify(true);
                console.log("Error get :", err)
            }
            )
    }
    return (
        <div className='p-8 w-full flex flex-col items-start justify-center text-black'
            data-aos="fade-in"
            data-aos-offset="0"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="false"
            data-aos-once="false"
            data-aos-anchor-placement="center-bottom"
        >
            {notify ? <>
                <div>
                    Error
                </div>
            </> : <></>}
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-full mb-4'>
                <div className='flex justify-center items-center w-4/5 my-2'>
                    <label htmlFor="trackingID" className='font-medium mr-2'>Tracking ID : </label>
                    <input type="text" name='trackingID' className="border border-red-500 rounded-md px-4 py-2 focus:outline-none focus:border-red-500" />
                </div>
                <button type='submit' className='bg-red-600 text-white rounded-lg py-2 px-1'>Track Order</button>
            </form>

            <TrackImg status={status} />


        </div>
    )
}

export default TrackOne
