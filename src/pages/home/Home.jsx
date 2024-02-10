import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/heroSection/HeroSection';
import ProductCard from '../../components/productCard/ProductCard';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';

function Home() {
  const context = useContext(myContext);
  const { product } = context;

  // Display only the first 3 products
  const latestProducts = product.slice(0, 4);

  return (
    <Layout>
      <HeroSection />
      <div className="flex justify-center pt-6">
          <Link to={'/shop'}>
            <button className='bg-gray-300 px-5 py-2 rounded-xl text-lg transition duration-300 ease-in-out hover:bg-gray-400 hover:text-white'>
              See more
            </button>
          </Link>
      </div>
      <ProductCard products={latestProducts} showDetails={false} />
    </Layout>
  );
}

export default Home;
