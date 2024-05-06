import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import abi from "../../../contract/MernDapp.json";

export default function OrderForm({ selectedProduct, closeForm, setShowNotification, setNotificationText,setTrackIDText }) {

    //smart-Contract Portion

    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
    });
    const { contract } = state;
    const [loading, setLoading] = useState(false); 
    const [account, setAccount] = useState("None");
    const[sessionUser,setSessionuser]=useState('');

    //connect wallet
    useEffect(() => {
        const connectWallet = async () => {
            const contractAddress = "0x6De40bBD6A41d30E0951E40743C463C9d2Bb7249";
            const contractABI = abi.abi;
            try {
                const { ethereum } = window;

                if (ethereum) {
                    const account = await ethereum.request({
                        method: "eth_requestAccounts",
                    });

                    window.ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });

                    window.ethereum.on("accountsChanged", () => {
                        window.location.reload();
                    });

                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(
                        contractAddress,
                        contractABI,
                        signer
                    );
                    setAccount(account[0]);
                    setState({ provider, signer, contract });
                } else {
                    alert("Please install metamask");
                }
            } catch (error) {
                console.log(error);
            }
        };
        axios.get('https://mern-marketplace-dapp.vercel.app/auth/getMail')
            .then(res => {
                setSessionuser(res.data.email);
                return(res.data.email);
                
            })
            .catch(err => console.log(err));
        connectWallet();
    }, []);

    // Update the fetchEthereumPrice function
    async function fetchEthereumPrice() {
        try {
            const response = await axios.get('https://mern-marketplace-dapp.vercel.app/coin-gecko');
            return response.data.ethereum.usd;
        } catch (error) {
            console.error('Error fetching Ethereum price:', error);
            return null;
        }
    }


    function convertUsdToEth(usdAmount, ethereumPrice) {
        if (!ethereumPrice || isNaN(usdAmount)) return null;
        return (usdAmount / ethereumPrice).toFixed(6); // Round to 6 decimal places
    }
   // State to track loading status

    const errorHandler = (message) => {
        setLoading(false);
        closeForm();
        setShowNotification(true);
        setNotificationText(message);
        setTimeout(() => {
            setShowNotification(false);
        }, 10000);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        // console.log("Email2 : ",sessionUser);
        formData.append('email', sessionUser);
        console.log(formData);
        let usdAmount = parseFloat(formData.get('productPrice'));
        const quantity = parseFloat(formData.get('quantity'));
        const totalPrice = usdAmount * quantity;
        const ethereumPrice = await fetchEthereumPrice();
        const ethAmount = convertUsdToEth(totalPrice, ethereumPrice);
        formData.set('productPrice', totalPrice.toString());
        //fetching record from formData
        const customerName = formData.get('customerName')
        const productName = formData.get('productName');
        
        try {
            // const amount = { value: ethers.utils.parseEther(`${ethAmount}`) };
            // const transaction = await contract.pay(0, customerName, productName, amount);
            // setLoading(true);
            // const trans = await transaction.wait();
            axios.post('http://localhost:3001/prod/order', formData)
                .then(res => {
                    // console.log("Order Place : ",res.data._id);
                    closeForm();
                    setShowNotification(true);
                    setNotificationText('Order placed successfully!')
                    setTrackIDText(res.data._id)
                    setTimeout(() => {
                        setShowNotification(false);
                    }, 10000);

                })
                .catch(err => console.error('Error sending data:', err));
            // console.log("Transaction successful:", trans);
        } catch (error) {
            console.error("Transaction failed:", error.message);
            if (error.message == 'MetaMask Tx Signature: User denied transaction signature.') {
                errorHandler('Transaction Denied');
            }
            if (error.message.includes("insufficient funds for gas")) {
                errorHandler('Insufficient funds for gas');
            }
        }
        // setLoading(false);


    };

    useEffect(() => {
        axios.get('https://mern-marketplace-dapp.vercel.app/prod/getProducts')
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err));
    }, []);


    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                {loading ? (
                    <>
                        <div className='flex flex-col justify-center items-center'>
                            <div class="cube-folding">
                                <span class="leaf1"></span>
                                <span class="leaf2"></span>
                                <span class="leaf3"></span>
                                <span class="leaf4"></span>
                            </div>
                            <span class="loading mt-4 text-white" data-name="Loading">Please Wait</span>
                        </div>
                    </>
                ) : (
                    <>
                        <form className="bg-white px-8 pb-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                            <h2 className="text-xl py-2 rounded-b-lg w-full font-bold mb-4 w-full text-center bg-slate-950 text-white">Order Form</h2>
                            <div className='flex justify-center items-center '>
                                <div className="mb-4 mr-2">
                                    <label htmlFor="customerName" className="block text-gray-700 font-bold mb-2">Customer's Name</label>
                                    <input type="text" id="customerName" name="customerName" className="border border-gray-400 rounded w-full px-3 py-2" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Product Name</label>
                                    <input type="text" id="productName" name="productName" className="border border-gray-400 rounded w-full px-3 py-2" value={selectedProduct.productName} readOnly />
                                </div>
                            </div>
                            <div className='flex justify-center items-center '>
                                <div className="mb-4 mr-2">
                                    <label htmlFor="productPrice" className="block text-gray-700 font-bold mb-2">Product Price</label>
                                    <input type="text" id="productPrice" name="productPrice" className="border border-gray-400 rounded w-full px-3 py-2" value={selectedProduct.productPrice} readOnly />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity</label>
                                    <input type="number" id="quantity" name="quantity" className="border border-gray-400 rounded w-full px-3 py-2" min="1" max={parseFloat(selectedProduct.productQuantity)} required />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="productSize" className="block text-gray-700 font-bold mb-2">Select Size</label>
                                <select id="productSize" name="productSize" className="border border-gray-400 rounded w-full px-3 py-2" required>
                                    {/* Mapping over the sizes and rendering each as an option */}
                                    {selectedProduct.productSizes.split(',').map((size, index) => (
                                        <option key={index} value={size.trim()}>{size.trim()}</option>
                                    ))}
                                </select>
                            </div>


                            <div className="mb-4">
                                <label htmlFor="productColor" className="block text-gray-700 font-bold mb-2">Select Color</label>
                                <select id="productColor" name="productColor" className="border border-gray-400 rounded w-full px-3 py-2" required>
                                    {selectedProduct.productColors.split(',').map((color, index) => (
                                        <option key={index} value={color.trim()}>{color.trim()}</option>
                                    ))}
                                </select>
                            </div>


                            <div className="text-center">
                                <button type="submit" className="bg-slate-950 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded">
                                    Submit
                                </button>
                                <button type="button" onClick={closeForm} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
                                    Cancel
                                </button>


                            </div>
                        </form>
                    </>

                )}

            </div>
            {/* {showNotification && (
                <div className="fixed bottom-5 right-5">
                    <div className="bg-green-500 text-white px-4 py-2 rounded">
                        {notification}
                    </div>
                </div>
            )} */}
        </>
    )
}