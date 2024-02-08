import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import Loader from '../loader/Loader'; // Import the loader component

function ProductCard() {
  const context = useContext(myContext);
  const { product } = context;
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
        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-32 animate-fade-in ${productsLoaded ? 'opacity-100' : 'opacity-0'}`}>Our Latest Collection</h1> 
       
        {!productsLoaded ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> {/* Increased gap between columns to 8 */}
            {product.map((item, index) => {
              const { imageUrl, id } = item;
              return (
                <div key={index} className="p-4 drop-shadow-lg h-96"> {/* Increased height for each product container */}
                  <div className="flex flex-col h-full">
                    <div onClick={() => navigate(`/productinfo/${id}`)} className="flex justify-center cursor-pointer h-full"> {/* Adjusted height to fit the container */}
                      <div className="w-full h-full overflow-hidden"> {/* Container for the image */}
                        <img className="object-cover w-full h-full hover:scale-150 transition-scale-150 duration-300 ease-in-out" src={imageUrl} alt="product" /> {/* Adjusted size of the image */}
                      </div>
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
