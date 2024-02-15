import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./components/signup"
import SignIn from "./components/signin";
import AdminPortal from "./AdminPortal/adminPortal";
import Home from "./MarketPlace/home";
import { Provider } from 'react-redux';
import { store } from './app/store';
import Products from "./AdminPortal/Products";
import Customers from "./AdminPortal/Customers";

function App() {
  return (
    <Provider store={store}> {/* Place Provider here to wrap the entire application */}
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/adminPortal" element={<AdminPortal />}></Route>
            <Route path="/adminPortal/products" element={<Products />}></Route>
            <Route path="/adminportal/products" element={<Customers/>}></Route>
            
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App;
