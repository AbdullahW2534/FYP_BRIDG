import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Unicons from '@iconscout/react-unicons';
import Signup from "./components/signup"
import SignIn from "./components/signin";
import AdminPortal from "./AdminPortal/adminPortal";
import Home from "./MarketPlace/home";
import { Provider } from 'react-redux';
import { store } from './app/store';
import Products from "./AdminPortal/Products";
import Customers from "./AdminPortal/Customers";
import Pricing from "./MarketPlace/ProductsPage/Pricing";
import Posts from "./AdminPortal/Posts";
import Blogs from "./MarketPlace/Blogs/Blogs";
import Categories from "./AdminPortal/Categories";
import InverstorPortal from "./InvestorPortal/InverstorPortal";
import AssistantPortal from "./AssistantPortal/AssistantPortal";
import AddGig from "./AssistantPortal/UI/AddGig";
import ViewGigs from "./AssistantPortal/UI/ViewGigs";
import Gigs from "./MarketPlace/Gigs/Gigs";
import ViewOrders from "./AssistantPortal/UI/ViewOrders";
import InvestorOrders from "./InvestorPortal/UI/InvestorOrders";
import AccountSettingsAssistant from "./AssistantPortal/UI/AccountSettingsAssistant";
import AccountSettingsInvestor from "./InvestorPortal/UI/AccountSettingsInvestor";
import Users from "./AdminPortal/Users";
import AdminGigs from "./AdminPortal/Gigs";
import About from "./MarketPlace/About/About";
import Contact from "./MarketPlace/Contact/Contact";


function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/services" element={<Pricing />}></Route>
            <Route path="/blogs" element={<Blogs />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/gigs" element={<Gigs />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/investor/dashboard" element={<InverstorPortal />}></Route>
            <Route path="/investor/viewOrders" element={<InvestorOrders />}></Route>
            <Route path="/investor/accountsettings" element={<AccountSettingsInvestor />}></Route>
            <Route path="/assistant/accountsettings" element={<AccountSettingsAssistant />}></Route>
            <Route path="/assistant/dashboard" element={<AssistantPortal />}></Route>
            <Route path="/assistant/addgig" element={<AddGig />}></Route>
            <Route path="/assistant/viewGigs" element={<ViewGigs />}></Route>
            <Route path="/assistant/viewOrders" element={<ViewOrders />}></Route>
            <Route path="/adminportal/dashboard" element={<AdminPortal />}></Route>
            <Route path="/adminPortal/services" element={<Products />}></Route>
            <Route path="/adminportal/users" element={<Users/>}></Route>
            <Route path="/adminportal/posts" element={<Posts/>}></Route>
            <Route path="/adminportal/categories" element={<Categories/>}></Route>
            <Route path="/adminportal/gigs" element={<AdminGigs/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App;
