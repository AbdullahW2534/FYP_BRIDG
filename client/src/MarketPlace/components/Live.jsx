import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LiveEthereumPrice = () => {
  const [ethereumPrice, setEthereumPrice] = useState(null);
  const [usdAmount, setUsdAmount] = useState('');
  const [ethAmount, setEthAmount] = useState(null);

  useEffect(() => {
    const fetchEthereumPrice = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const price = response.data.ethereum.usd;
        setEthereumPrice(price);
      } catch (error) {
        console.error('Error fetching Ethereum price:', error);
      }
    };
    fetchEthereumPrice();
    const intervalId = setInterval(fetchEthereumPrice, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleUsdAmountChange = (event) => {
    setUsdAmount(event.target.value);
  };

  const convertUsdToEth = () => {
    if (!ethereumPrice || isNaN(usdAmount)) return;
    const ethAmount = usdAmount / ethereumPrice;
    setEthAmount(ethAmount.toFixed(6)); // Round to 6 decimal places
  };

  return (
    <div>
      <h2>Live Ethereum Price</h2>
      {ethereumPrice !== null ? (
        <>
          <p>The current price of Ethereum is ${ethereumPrice}</p>
          <div>
            <input type="number" value={usdAmount} onChange={handleUsdAmountChange} placeholder="Enter USD amount" />
            <button onClick={convertUsdToEth}>Convert to Ethereum</button>
            {ethAmount !== null && <p>{usdAmount} USD is approximately {ethAmount} ETH</p>}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LiveEthereumPrice;
