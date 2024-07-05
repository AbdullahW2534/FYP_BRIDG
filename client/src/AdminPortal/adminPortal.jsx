import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Unicons from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Topbar from './UIComp/Topbar';
import Sidebar from './UIComp/Sidebar';

export default function AdminPortal() {
  const navigate = useNavigate();
  const [suc, updateSuc] = useState('');

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/dash/dashboard`)
      .then(res => {
        if (res.data === "Success") {
          updateSuc("Successful");
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  const staticMetrics = {
    users: 1500,
    orders: 320,
    revenue: 54000,
  };

  const staticChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Revenue',
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='w-full flex'>
      <Sidebar />
      <div className='w-full h-screen flex flex-col'>
        <Topbar />
        <div className='w-full'>
          <h2 className='w-full text-center font-bold text-purple-500 text-3xl'>
            DASHBOARD
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-2'>
            <div className='bg-white p-4 rounded-lg shadow-lg shadow-purple-100 flex items-center'>
              <Unicons.UilUsersAlt width={40} height={40} className="text-red-500 mr-4" />
              <div>
                <h2 className='text-xl font-semibold'>Total Users</h2>
                <p className='text-2xl'>{staticMetrics.users}</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg shadow-purple-100 flex items-center'>
              <Unicons.UilShoppingCartAlt width={40} height={40} className="text-blue-500 mr-4" />
              <div>
                <h2 className='text-xl font-semibold'>Total Orders</h2>
                <p className='text-2xl'>{staticMetrics.orders}</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg shadow-purple-100 flex items-center'>
              <Unicons.UilDollarAlt width={40} height={40} className="text-yellow-500 mr-4" />
              <div>
                <h2 className='text-xl font-semibold'>Total Revenue</h2>
                <p className='text-2xl'>${staticMetrics.revenue}</p>
              </div>
            </div>
          </div>
          <div className='mt-3 bg-white p-4 rounded-lg shadow-lg'>
            <h2 className='w-1/12 text-center font-semibold text-white rounded-r-lg px-2 text-2xl bg-purple-500'>
              SALES
            </h2>
            <div className='w-4/6 ml-10'>

              <Line data={staticChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
