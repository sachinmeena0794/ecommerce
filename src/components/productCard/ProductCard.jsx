import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import Loader from '../loader/Loader'; // Import the loader component

function ProductCard() {
  const context = useContext(myContext);
  const { mode, product } = context;
  const navigate = useNavigate();
  const [productsLoaded, setProductsLoaded] = useState(false); // State variable to track whether the products are loaded

  useEffect(() => {
    // Check if the product data is available
    if (product && product.length > 0) {
      // Use a small delay to simulate loading for demonstration purposes
      setTimeout(() => {
        setProductsLoaded(true); // Update the state variable to indicate that the products are loaded
      }, 1000); // Adjust the delay as needed
    }
  }, [product]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        {/* Conditionally render the loader if the products are not yet loaded */}
        {!productsLoaded ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.map((item, index) => {
              const { title, price, imageUrl, id } = item;
              return (
                <div key={index} className="p-4 drop-shadow-lg">
                  <div className="flex flex-col h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                    <div onClick={() => navigate(`/productinfo/${id}`)} className="flex justify-center cursor-pointer">
                      <img className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out" src={imageUrl} alt="blog" />
                    </div>
                    <div className="flex-grow p-5 border-t-2 flex flex-col">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>HEKAWY</h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h1>
                      <p className="leading-relaxed mb-3 mt-auto" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductCard;
