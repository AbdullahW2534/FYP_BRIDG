import React, { useEffect, useState } from 'react';
import Heading from './heading';
import axios from 'axios';
import { ethers } from 'ethers';
import abi from "../../contract/MernDapp.json";
import './animation.css';


export default function Products() {

    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [productsdata, setProducts] = useState([]);

    //smart-Contract Portion

    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
    });

    const [account, setAccount] = useState("None");

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

        connectWallet();
    }, []);





    //Mern Orders

    const openForm = (product) => {
        setShowForm(true);
        setSelectedProduct(product);
    };

    const closeForm = () => {
        setShowForm(false);
        setSelectedProduct(null);
    };

    // Update the fetchEthereumPrice function
    async function fetchEthereumPrice() {
        try {
            const response = await axios.get('http://localhost:3001/coin-gecko');
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
    const { contract } = state;
    const [notification, setNotificationText] = useState('');
    const [loading, setLoading] = useState(false); // State to track loading status

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        let usdAmount = parseFloat(formData.get('productPrice'));
        const quantity = parseFloat(formData.get('quantity'));
        const totalPrice = usdAmount * quantity;
        const ethereumPrice = await fetchEthereumPrice();
        const ethAmount = convertUsdToEth(totalPrice, ethereumPrice);
        formData.set('productPrice', totalPrice.toString());

        //fetching record from formData
        const customerName = formData.get('customerName')
        const productID = formData.get('productID');
        const productName = formData.get('productName');
        try {
            const amount = { value: ethers.utils.parseEther(`${ethAmount}`) };
            const transaction = await contract.pay(0, customerName, productName, amount);
            setLoading(true);
            const trans = await transaction.wait();
            axios.post('http://localhost:3001/prod/order', formData)
                .then(res => {
                    console.log(formData);
                    closeForm();
                    setShowNotification(true);
                    setNotificationText('Order placed successfully!')
                    setTimeout(() => {
                        setShowNotification(false);
                    }, 10000);

                })
                .catch(err => console.error('Error sending data:', err));
            console.log("Transaction successful:", trans);
        } catch (error) {
            console.error("Transaction failed:", error.message);
            if (error.message == 'MetaMask Tx Signature: User denied transaction signature.') {

                setLoading(false);
                closeForm();
                setShowNotification(true);
                setNotificationText('Transaction Denied');
                setTimeout(() => {
                    setShowNotification(false);
                }, 10000);
            }
            if (error.message.includes("insufficient funds for gas")) {
                console.error("Insufficient funds for gas:", error);
                closeForm();
                setShowNotification(true);
                setNotificationText('Insufficient funds for gas');
                setTimeout(() => {
                    setShowNotification(false);
                }, 10000);
            }
        }
        setLoading(false);


    };

    useEffect(() => {
        axios.get('http://localhost:3001/prod/getProducts')
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className='w-full mt-5'>
                <Heading />
                <div className='grid grid-cols-5 gap-6 p-10'>
                    {productsdata.map((product, index) => (
                        <div className='flex flex-col justify-center items-start w-5/6 rounded-t-lg shadow-lg pb-1' key={index}>
                            <img src={`http://localhost:3001/Images/${product.image}`} className='w-full h-48 rounded-t-lg' alt={`img${index}`} />
                            <h2>{product.productName}</h2>
                            <h2 className='font-bold'>{product.productPrice}<span> $ /- </span></h2>
                            <div className='w-full flex items-center justify-end'>
                                <button className='rounded-lg text-xs px-1 py-2 mr-1 font-bold text-white hover:bg-slate-900 bg-slate-950'
                                    onClick={() => openForm(product)}>
                                    BUY NOW
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showForm && selectedProduct && (
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
                                <div className="mb-4">
                                    <label htmlFor="customerName" className="block text-gray-700 font-bold mb-2">Customer's Name</label>
                                    <input type="text" id="customerName" name="customerName" className="border border-gray-400 rounded w-full px-3 py-2" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Product Name</label>
                                    <input type="text" id="productName" name="productName" className="border border-gray-400 rounded w-full px-3 py-2" value={selectedProduct.productName} readOnly />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="productPrice" className="block text-gray-700 font-bold mb-2">Product Price</label>
                                    <input type="text" id="productPrice" name="productPrice" className="border border-gray-400 rounded w-full px-3 py-2" value={selectedProduct.productPrice} readOnly />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity</label>
                                    <input type="number" id="quantity" name="quantity" className="border border-gray-400 rounded w-full px-3 py-2" required />
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
            )}


            {showNotification && (
                <div className="fixed bottom-5 right-5">
                    <div className="bg-green-500 text-white px-4 py-2 rounded">
                        {notification}
                    </div>
                </div>
            )}
        </>
    );
}
