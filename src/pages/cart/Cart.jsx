import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, updateCartItemQuantity } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB, auth } from '../../fireabase/FirebaseConfig'; // Update the import path for Firebase config
import { clearCart } from '../../redux/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const shipping = parseInt(100);
  const grandTotal = shipping + totalAmount;

  const deleteCart = (item) => {
    toast.dismiss();
    dispatch(deleteFromCart({ id: item }));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    let tempTotal = 0;
    cartItems.forEach((cartItem) => {
      tempTotal += parseInt(cartItem.price * cartItem.quantity);
    });
    setTotalAmount(tempTotal);
  }, [cartItems]);

  const incrementQuantity = (item) => {
    dispatch(updateCartItemQuantity({ id: item._id, quantity: item.quantity + 1 }));
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(updateCartItemQuantity({ id: item._id, quantity: item.quantity - 1 }));
    }
  };

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [street, setStreet] = useState("");
  const [society, setSociety] = useState("");

  const getUserInfo = () => {
    const user = auth.currentUser;
    if (user) {
      return {
        email: user.email,
        uid: user.uid
      };
    } else {
      return null;
    }
  };

  const buyNow = async (paymentMethod) => {
    if (cartItems.length === 0) {
      return toast.error('Your cart is empty. Add items to proceed.');
    }
    if (name === "" || address === "" || pincode === "" || phoneNumber === "" || roomNo === "" || street === "" || society === "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const userInfo = getUserInfo();

    if (!userInfo) {
      return toast.error("User not authenticated.");
    }

    // Check payment method
    if (paymentMethod === 'COD') {
      // If Cash on Delivery is chosen, process the order without RazorPay
      processOrder('COD', userInfo);
      return;
    }

    // If RazorPay is chosen, proceed with RazorPay payment
    const addressInfo = {
      name,
      address,
      roomNo,
      street,
      society,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    };

    const options = {
      key: 'rzp_live_L1Bw0era4Ek6O7',
      key_secret: 'T3XWsJxig5vOcFLyh3BIFCHf',
      amount: parseInt(grandTotal * 100),
      currency: 'INR',
      order_receipt: 'order_rcptid_' + name,
      name: 'HEKAWY',
      description: 'Fashion & style',
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems,
          addressInfo,
          grandTotal,
          date: new Date().toLocaleString(
            'en-US',
            {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }
          ),
          email: userInfo.email,
          userid: userInfo.uid,
          paymentId,
          status: "received"
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

    var pay = new window.Razorpay(options);
    pay.open();
  };

  const processOrder = (paymentMethod, userInfo) => {
    const addressInfo = {
      name,
      address,
      roomNo,
      street,
      society,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    };

    const orderInfo = {
      cartItems,
      addressInfo,
      grandTotal,
      date: new Date().toLocaleString(
        'en-US',
        {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }
      ),
      email: userInfo.email,
      userid: userInfo.uid,
      paymentMethod,
      status: "pending" // Update the status accordingly
    };

    try {
      const orderRef = collection(fireDB, 'order');
      addDoc(orderRef, orderInfo);

      // Dispatch the action to clear the cart
      dispatch(clearCart());

      // Notify the user about the successful order placement
      toast.success('Order Placed Successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="h-screen pt-5 mb-[60%]">
        {cartItems.length === 0 ? (
          <div className="text-black text-center text-xl">Your cart is empty. Add items to proceed.</div>
        ) : (
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">

            <div className="mb-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">₹{totalAmount}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">₹{shipping}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between mb-3">
                <p className="text-lg font-bold">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold">₹{grandTotal}</p>
                </div>
              </div>
              <Modal
                name={name}
                address={address}
                roomNo={roomNo}
                street={street}
                society={society}
                pincode={pincode}
                phoneNumber={phoneNumber}
                setName={setName}
                setAddress={setAddress}
                setRoomNo={setRoomNo}
                setStreet={setStreet}
                setSociety={setSociety}
                setPincode={setPincode}
                setPhoneNumber={setPhoneNumber}
                buyNow={buyNow}
              />
            </div>
            <div className="rounded-lg md:w-2/3">
              {cartItems.map((item, index) => {
                const { id, title, price, description, imageUrls, quantity } = item;
                return (
                  <div key={id} className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start">
                    <img src={imageUrls[0]} alt="product-image" className="w-full rounded-lg sm:w-40" />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                        <h2 className="text-sm text-gray-900">{description}</h2>
                        <p className="mt-1 text-xs font-semibold text-gray-700">₹{price}</p>
                        <div className="mt-2 flex items-center">
                          <button className="text-xs px-2 py-1 bg-gray-200 rounded-full mr-2" onClick={() => decrementQuantity(item)}>-</button>
                          <span className="text-xs font-semibold">{quantity}</span>
                          <button className="text-xs px-2 py-1 bg-gray-200 rounded-full ml-2" onClick={() => incrementQuantity(item)}>+</button>
                        </div>
                      </div>
                      <div onClick={() => deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>
        )}
      </div>
    </Layout>
  );
}

export default Cart;
