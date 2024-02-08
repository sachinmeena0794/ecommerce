import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import { auth } from '../../fireabase/FirebaseConfig'; // Corrected the import path

function Order() {
  const context = useContext(myContext);
  const { mode, loading, order } = context;
  const [currentUserOrders, setCurrentUserOrders] = useState([]); // State to hold orders of the current user

  // Get the current user's ID
  const currentUserID = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    // Filter orders based on the current user's ID
    const filteredOrders = order.filter((order) => order.userid === currentUserID);
    setCurrentUserOrders(filteredOrders);
  }, [order, currentUserID]);

  return (
    <Layout>
      {loading && <Loader />}
      <div className="flex flex-col min-h-screen">
        {currentUserOrders.length > 0 ? (
          <div className="flex-grow">
            {currentUserOrders.map((order) => (
              <div key={order.id} className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                {order.cartItems.map((item) => (
                  <div key={item.id} className="rounded-lg md:w-2/3">
                    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
                      <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                          <p className="mt-1 text-xs text-gray-700" >{item.description}</p>
                          <p className="mt-1 text-xs text-gray-700" >{item.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-grow flex justify-center items-center">
            <h2 className="text-2xl text-white">No Orders</h2>
          </div>
        )}
        <footer className="bg-gray-300">
          {/* Footer content */}
        </footer>
      </div>
    </Layout>
  );
}

export default Order;
