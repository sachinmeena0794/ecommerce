import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import { auth } from '../../fireabase/FirebaseConfig'; // Corrected the import path
import Table from '../../components/table/table';

function Order() {
  const context = useContext(myContext);
  const { loading, order } = context;
  const [currentUserOrders, setCurrentUserOrders] = useState([]); // State to hold orders of the current user

  // Get the current user's ID
  const currentUserEmail = auth.currentUser ? auth.currentUser.email : null;

  useEffect(() => {
    // Filter orders based on the current user's ID
    const filteredOrders = order.filter((order) => order.email === currentUserEmail);
    setCurrentUserOrders(filteredOrders);
  }, [order, currentUserEmail]);

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'cartItems[0].title',
      },
   
      {
        Header: 'Total',
        accessor: 'grandTotal',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Description',
        accessor: 'cartItems[0].description',
      },
    ],
    []
  );

  return (
    <Layout>
      {loading && <Loader />}
      <div className="flex flex-col items-center justify-center">
        <div className="w-full">
          <h2 className="text-center text-3xl font-bold mb-4">Order Details</h2>
        </div>
        <div className="w-full overflow-x-auto">
          <Table columns={columns} data={currentUserOrders} />
        </div>
      </div>
    </Layout>
  );
}

export default Order;
