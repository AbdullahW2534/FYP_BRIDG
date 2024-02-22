import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrackTable from './TrackTable';
function TrackAll({ post }) {
    const [postsData, setPosts] = useState([]);
    const [sessionUser, setSessionuser] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/auth/getMail')
            .then(res => {
                const userEmail = res.data.email;
                console.log("Mail : ", userEmail);
                setSessionuser(userEmail);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        console.log("If User : ", sessionUser);
        if (sessionUser) {
            console.log("fetch");
            axios.get(`http://localhost:3001/prod/getOrders/${sessionUser}`)
                .then(res => {
                    console.log("Res Get : ", res.data);
                    setPosts(res.data);
                })
                .catch(err => console.log("Error get :", err));
        }
    }, [sessionUser]);
    return (
        <div className='p-8 w-full flex items-start justify-center text-black'
            data-aos="fade-in"
            data-aos-offset="0"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="false"
            data-aos-once="false"
            data-aos-anchor-placement="center-bottom"
        >
            <TrackTable postsData={postsData}/>
        </div>
    )
}

export default TrackAll