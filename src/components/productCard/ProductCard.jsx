import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader'; // Import the loader component
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';


function ProductCard({ products, showDetails }) { // Receive 'products' and 'showDetails' as props
  const navigate = useNavigate();
  const [productsLoaded, setProductsLoaded] = useState(false); // State variable to track whether the products are loaded
  const dispatch = useDispatch();
  const handleBuyNow = (product) => {
    toast.dismiss();
    setTimeout(() => {
      dispatch(addToCart(product));
      toast.success('Added to cart');
    }, 500); 
  };
  useEffect(() => {
    // Check if the product data is available
    if (products && products.length > 0) {
      // Use a small delay to simulate loading for demonstration purposes
      setTimeout(() => {
        setProductsLoaded(true); // Update the state variable to indicate that the products are loaded
      }, 200); // Adjust the delay as needed
    }
  }, [products]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
       {  <h1 className={`text-lg md:text-3xl lg:text-3xl font-bold }`}>
          Our Latest Collection
        </h1>}
        <hr className="border-t-3 border-gray-500  mb-8 w-80" /> {/* Horizontal rule with increased border color */}
        {/* Rest of the component */}
        {/* Conditionally render the loader if the products are not yet loaded */}
        {!productsLoaded ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> {/* Gap between columns */}
            {products.map((item, index) => {
              const { imageUrl, _id, title, price } = item;
              return (
                <div key={index} className="p-4 drop-shadow-lg" style={{ marginBottom: '20px' }}> {/* Added marginBottom */}
                  <div className="flex flex-col h-full">
                    <div onClick={() => navigate(`/productinfo/${_id}`)} className="flex justify-center cursor-pointer h-96"> {/* Increased height for each product container */}
                      <img className="object-cover w-full h-full hover:scale-110 transition-scale-180 duration-300 ease-in-out" src={imageUrl} alt="product" /> {/* Adjusted size of the image */}
                    </div>
                    {/* Conditionally render additional details based on the showDetails prop */}
                    {showDetails && (
                      <div className="mt-4">
                        <h3 className="text-lg font-bold">{title}</h3>
                        <p className="text-sm font-semibold text-gray-700">₹{price}</p>
                        <button
  onClick={() => handleBuyNow(item)}
  className="bg-black text-white py-2 px-4 rounded-lg mt-2"
  style={{ cursor: 'pointer' }}
>
  Buy Now
</button>
                      </div>
                    )}
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
