import Login from './view/Login';
import PrivateRoute from './config/PrivateRoute';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './view/Dashboard';
import Signup from './view/Signup';

import Product from './view/Products';
import DashboardOrders from './view/DashboardOrders';
import DashboardProducts  from './view/DashboardProducts';
import AddProduct  from './view/AddProduct';
import Centers from './view/Centers';
import CenterDetails from './view/CenterDetails';
import ForgetPassword from './view/ForgetPassword';
import Home from './view/Home';
import SellerProfile from './view/SellerProfile';
import SellerResetPassword from './view/SellerResetPassowrd';
import SellerViewProduct  from './view/SellerViewProduct';
import UpdatePassword from './view/UpdatePassword';
import Cart from './view/Cart';
import Orders from './view/Orders';
import ProductDetails from './view/ProductDetails';

function App() {
  return (
    <>
  
    <Routes>
      <Route exact path='/dashboard' element={<Dashboard />} />
      <Route path='/' element = {<Home/>}/>
      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/products' element={<Product/>}></Route>
      <Route path='/seller-products' element={<DashboardProducts/>}></Route>
      <Route path='/seller-product-detail/' element={<SellerViewProduct/>}/>
      <Route path='/seller-profile' element={<SellerProfile/>}/>
      <Route path='/seller-reset-password' element={<SellerResetPassword/>}/> 
      <Route path='/add-product' element={<AddProduct/>}></Route>
      <Route path='/centers' element={<Centers/>}></Route>
      <Route path='/center-details' element={<CenterDetails/>}></Route>
      <Route path='/forget-password' element={<ForgetPassword/>}></Route>
      <Route path='/reset-password/' element={<SellerResetPassword/>}></Route> // before login forgetpassword
      <Route path='/update-password/' element={<UpdatePassword/>}></Route>  // after login
      <Route path='/seller-orders' element ={<DashboardOrders/>}/>
      <Route path='/cart' element ={<Cart/>}/>      
      <Route path='/orders' element ={<Orders/>}/>
      <Route path='/product-detail' element={<ProductDetails/>}/>
    </Routes>
    </>
  );

}

export default App;
