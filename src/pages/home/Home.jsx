import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/heroSection/HeroSection';
import ProductCard from '../../components/productCard/ProductCard';
import myContext from '../../context/data/myContext';

function Home() {
  const context = useContext(myContext);
  const { product } = context;

  // Display only the first 3 products
  const latestProducts = product.slice(0, 4);

  return (
    <Layout>
    <HeroSection />
    <div className='flex flex-col'> 
      <ProductCard products={latestProducts} showDetails={false} />
      
    </div>
  </Layout>
  
  );
}

export default Home;
