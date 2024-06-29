import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Unicons from '@iconscout/react-unicons';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';

export default function InverstorPortal() {
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const fetchTransactions = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get('http://localhost:3001/order/getOrders');
      console.log(response.data);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get('https://api.paystack.co/balance', {
          headers: {
            Authorization: `Bearer sk_test_3a87c0cd3b7e90b49d575aae472cb941d5ff942e`,
          },
        });
        setBalance(response.data.data[0].balance / 100); // Assuming Paystack returns balance in kobo
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setIsLoading(false);
      }
    };

    fetchBalance();
    fetchTransactions();
  }, []);

  return (
    <div className='w-full flex'>
      <Sidebar />
      <div className='w-full h-screen flex flex-col'>
        <Topbar />
        <div className='p-4'>
          <h2 className='text-xl font-bold mb-4'>Paystack Account Information</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <p className='font-semibold'>Current Balance:  <span className='font-bold ml-2 text-2xl'>
                {balance}
              </span>
                <span className='text-xs ml-1'>
                  ZAR
                </span>
              </p>
            </div>
          )}
          <h3 className='text-lg font-bold mt-4 mb-2'>Transaction History</h3>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white'>
              <thead>
                <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                  <th className='py-3 px-6 text-left'>ID</th>
                  <th className='py-3 px-6 text-left'>Sender</th>
                  <th className='py-3 px-6 text-left'>Recipient</th>
                  <th className='py-3 px-6 text-left'>Amount</th>
                  <th className='py-3 px-6 text-left'>Transaction ID</th>
                  <th className='py-3 px-6 text-left'>WithDraw</th>
                </tr>
              </thead>
              <tbody className='text-gray-600 text-sm font-light'>
                {transactions.map((transaction) => (
                  <tr key={transaction._id} className='border-b border-gray-200 hover:bg-gray-100'>
                    <td className='py-3 px-6 text-left whitespace-nowrap'>{transaction._id}</td>
                    <td className='py-3 px-6 text-left whitespace-nowrap'>{transaction.taskHead.name}</td>
                    <td className='py-3 px-6 text-left whitespace-nowrap'>{transaction.gigUser.name}</td>
                    <td className='py-3 px-6 text-left whitespace-nowrap'>{transaction.price} 
                      <span className=' ml-2 font-semibold'>
                    ZAR
                    </span>
                    </td>
                    <td className='py-3 px-6 text-left whitespace-nowrap'>{transaction.transaction}</td>
                    <td className='py-3 px-6 text-left whitespace-nowrap'>
                      <Unicons.UilMoneyWithdraw width={40} height={40} className=" ml-1 text-gray-500 hover:text-gray-600 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
}

