import {React, lazy, Suspense} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
const UpdateLook = lazy (()=>import('./pages/admin/page/updateLook'));
const Allproducts = lazy (()=>import('./pages/allproducts/Allproducts'));
const Loader = lazy (()=>import("./components/loader/Loader"))
const Look = lazy (()=>import('./pages/shop/shop'));
const About = lazy (()=>import ('./pages/about/About'))




function App() {
  return (
    <HashRouter>
      <MyState>
      <Router>
      <Suspense fallback= {<Loader/>}>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Allproducts/>} />
          <Route path="/look" element={<Look />} />
          <Route path="/about" element={<About />} />
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<ProtectedRoute>
          <Cart />
          </ProtectedRoute>} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/productinfo/:id' element={
          <ProtectedRoute>
          <ProductInfo/>
          </ProtectedRoute>} />
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProduct/>
            </ProtectedRouteForAdmin>
          } />
           <Route path='/lookupdate' element={
            <ProtectedRouteForAdmin>
              <UpdateLook/>
            </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct' element={
            <ProtectedRouteForAdmin>
              <UpdateProduct/>
            </ProtectedRouteForAdmin>
          } />
          <Route path="/*" element={<Home />} />
        </Routes>
        <ToastContainer/>
      </Suspense>
        
     
      </Router>
    </MyState>
    </HashRouter>
    

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
  
  if(admin.email === 'skillsuup@gmail.com'){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }

}