import React, { useContext, useState, useEffect } from 'react';
import { FaUserTie } from 'react-icons/fa';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../../../fireabase/FirebaseConfig';

function Dashboard() {
  const context = useContext(myContext);
  const { mode } = context;

  const [totals, setTotals] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsQuery = collection(fireDB, 'products');
        const ordersQuery = collection(fireDB, 'order');
        const usersQuery = collection(fireDB, 'users');

        const productsSnapshot = await getDocs(productsQuery);
        const ordersSnapshot = await getDocs(ordersQuery);
        const usersSnapshot = await getDocs(usersQuery);

        const totalProducts = productsSnapshot.size;
        const totalOrders = ordersSnapshot.size;
        const totalUsers = usersSnapshot.size;

        setTotals({
          totalProducts,
          totalOrders,
          totalUsers,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect once on mount

  const { totalProducts, totalOrders, totalUsers } = totals;

  return (
    <Layout>
<section className="text-gray-600 body-font flex flex-col justify-center items-center">
  <div className="container mx-auto px-4 mb-10">
    <div className="flex flex-wrap -m-4 text-center">
      <DashboardCard icon={<FaUserTie size={50} />} count={totalProducts} label="Total Products" />
      <DashboardCard icon={<FaUserTie size={50} />} count={totalOrders} label="Total Orders" />
      <DashboardCard icon={<FaUserTie size={50} />} count={totalUsers} label="Total Users" />
      {/* Add more cards as needed */}
    </div>
  </div>
  <DashboardTab />
</section>


    </Layout>
  );
}

// Component for individual dashboard cards
const DashboardCard = ({ icon, count, label }) => (
  <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
    <div className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl">
      <div className="text-purple-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
        {icon}
      </div>
      <h2 className="title-font font-medium text-3xl text-black">{count}</h2>
      <p className=" text-purple-500 font-bold">{label}</p>
    </div>
  </div>
);

export default Dashboard;
