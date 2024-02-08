import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, clearCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp += parseInt(cartItem.price);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  const shipping = parseInt(100);
  const grandTotal = shipping + totalAmount;

  const buyNow = async () => {
    if (cartItems.length === 0) {
      return toast.error('Your cart is empty. Add items to proceed.');
    }
      if (name === '' || address === '' || pincode === '' || phoneNumber === '') {
        return toast.error('All fields are required', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
  
      const addressInfo = {
        name,
        address,
        pincode,
        phoneNumber,
        date: new Date().toLocaleString(
          'en-US',
          {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }
        ),
      };
  
      const options = {
        key: 'rzp_test_IFOm24bpQ4YJD6',
        key_secret: 'EvwItVR6wtxz38xipvmWt4Kg',
        amount: parseInt(grandTotal * 100),
        currency: 'INR',
        order_receipt: 'order_rcptid_' + name,
        name: 'HEKAWY',
        description: 'for testing purpose',
        handler: function (response) {
          const paymentId = response.razorpay_payment_id;
  
          const orderInfo = {
            cartItems,
            addressInfo,
            date: new Date().toLocaleString(
              'en-US',
              {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              }
            ),
            email: JSON.parse(localStorage.getItem('user')).user.email,
            userid: JSON.parse(localStorage.getItem('user')).user.uid,
            paymentId,
          };
  
          try {
            const orderRef = collection(fireDB, 'order');
            addDoc(orderRef, orderInfo);
  
            // Dispatch the action to clear the cart
            dispatch(clearCart());
  
            // Notify the user about the successful payment
            toast.success('Payment Successful');
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const pay = new window.Razorpay(options);
      pay.open();
    };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col relative">
        <div className="flex-grow">
          <h1 className="mt-12 mb-12 text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 animate-fade-in">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            {cartItems.length > 0 ? (
              <div className="rounded-lg md:w-2/3">
                {cartItems.map((item, index) => {
                  const { title, price, description, imageUrl } = item;
                  return (
                    <div key={index} className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start relative">
                      <img src={imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                          <h2 className="text-sm text-gray-900">{description}</h2>
                          <p className="mt-1 text-xs font-semibold text-gray-700">₹{price}</p>
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={() => deleteCart(item)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                          <button className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={buyNow}>Buy Now</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center flex-grow uppercase text-2xl">Your cart is empty. Add items to proceed.</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
