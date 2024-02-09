import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/heroSection/HeroSection';
import ProductCard from '../../components/productCard/ProductCard';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext'
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

function Home() {
  const context = useContext(myContext)
  const {  product } = context
  return (
    <Layout>
      <HeroSection />
      <ProductCard products={product}  showDetails={false}/>
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/allproducts'}>
        <button className=' bg-gray-300 px-5 py-2 rounded-xl text-2xl transition duration-300 ease-in-out hover:bg-gray-400 hover:text-white'>See more</button>
        </Link>
      </div>
    </Layout>
  );
}

export default Home;
