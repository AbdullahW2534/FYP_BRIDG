import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Topbar from './UIComp/Topbar';
import Sidebar from './UIComp/Sidebar';

export default function AdminPortal() {
  const navigate = useNavigate();
  const [suc, updateSuc] = useState('');

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/dash/dashboard`)
      .then(res => {
        console.log("Response : ", res.data);
        if (res.data === "Success") {
          updateSuc("Successful");
        }
        else {
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  

  return (
    <div className='w-full flex '>
      <Sidebar/>
      <div className='w-full h-screen flex flex-col '>
      <Topbar/>
      </div>
     
    </div>
  );
}
