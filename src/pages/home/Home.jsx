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
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl text-center mb-8 mt-8 font-bold text-gray-600 leading-relaxed">
  <span className="text-3xl text-gray-600">Hekawy</span> indulges in the allure of rarity and exclusivity as we unveil a collection adorned in limited, unique, and luxurious fabrics, crafting an elite experience that whispers seduction through every thread.
</h1>


        <div className="flex flex-col">
          <ProductCard products={latestProducts} showDetails={false} />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
