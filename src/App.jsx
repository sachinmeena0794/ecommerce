import {React, lazy, Suspense} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// lazy(() => import("./pages/home"));
// import Home from './pages/home/Home';
// import Order from './pages/order/Order';
// import Cart from './pages/cart/Cart';
// import Dashboard from './pages/admin/dashboard/Dashboard';
// import NoPage from './pages/nopage/NoPage';
// import MyState from './context/data/myState';
// import Login from './pages/registration/Login';
// import Signup from './pages/registration/Signup';
// mport ProductInfo from './pages/productInfo/ProductInfo';
// import AddProduct from './pages/admin/page/AddProduct';
// import UpdateProduct from './pages/admin/page/UpdateProduct';
// import Allproducts from './pages/allproducts/Allproducts';
const Home = lazy (()=>import('./pages/home/Home'));
const Order = lazy (()=>import('./pages/order/Order'));
const Cart = lazy (()=>import('./pages/cart/Cart'));
const Dashboard = lazy (()=>import('./pages/admin/dashboard/Dashboard'));
const NoPage = lazy (()=>import('./pages/nopage/NoPage'));
const MyState = lazy (()=>import('./context/data/myState'));
const Login = lazy (()=>import('./pages/registration/Login'));
const Signup = lazy (()=>import('./pages/registration/Signup'));
const ProductInfo = lazy (()=>import('./pages/productInfo/ProductInfo'));
const AddProduct = lazy (()=>import('./pages/admin/page/AddProduct'));
const UpdateProduct = lazy (()=>import('./pages/admin/page/UpdateProduct'));
const Allproducts = lazy (()=>import('./pages/allproducts/Allproducts'));
const Loader = lazy (()=>import("./components/loader/Loader"))




function App() {
  return (
    <MyState>
      <Router>
      <Suspense fallback= {<Loader/>}>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/productinfo/:id' element={<ProductInfo/>} />
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProduct/>
            </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct' element={
            <ProtectedRouteForAdmin>
              <UpdateProduct/>
            </ProtectedRouteForAdmin>
          } />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer/>
      </Suspense>
        
     
      </Router>
    </MyState>

  )
}

export default App 

// user 

export const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem('user')
  if(user){
    return children
  }else{
    return <Navigate to={'/login'}/>
  }
}

// admin 

const ProtectedRouteForAdmin = ({children})=> {
  const admin = JSON.parse(localStorage.getItem('user'))
  
  if(admin.user.email === 'skillsuup@gmail.com'){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }

}