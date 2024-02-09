import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import Loader from '../loader/Loader'; // Import the loader component
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart ,updateCartItemQuantity} from '../../redux/cartSlice';

function ProductCard({ products, displayAdditionalInfo }) { // Receive the products and displayAdditionalInfo prop
  const navigate = useNavigate();
  const [productsLoaded, setProductsLoaded] = useState(false); // State variable to track whether the products are loaded
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the product data is available
    if (products && products.length > 0) {
      // Use a small delay to simulate loading for demonstration purposes
      setTimeout(() => {
        setProductsLoaded(true); // Update the state variable to indicate that the products are loaded
      }, 1000); // Adjust the delay as needed
    }
  }, [products]);
  const cartItems = useSelector((state) => state.cart);
  const handleBuyNow  = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      // Item already exists in cart, update quantity
      const updatedCartItems = cartItems.map((cartItem, index) => {
        if (index === existingItemIndex) {
          return { ...cartItem, quantity: cartItem.quantity + 1 }; // Create a new object with updated quantity
        }
        return cartItem;
      });
      dispatch(updateCartItemQuantity(updatedCartItems)); // Dispatch action to update cart items
      toast.success('Item quantity updated');
    } else {
      // Item does not exist in cart, add new item
      dispatch(addToCart(item));
      toast.success('Item added to cart');
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 animate-fade-in ${productsLoaded ? 'opacity-100' : 'opacity-0'}`}>
          Our Latest Collection
        </h1>
        <hr className="border-t-3 border-gray-500 mx-auto mb-8 w-48" /> {/* Horizontal rule with increased border color */}
        {/* Rest of the component */}
        {/* Conditionally render the loader if the products are not yet loaded */}
        {!productsLoaded ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> {/* Gap between columns */}
            {products.map((item, index) => {
              const { imageUrl, id, title, price } = item;
              return (
                <div key={index} className="p-4 drop-shadow-lg" style={{ marginBottom: '20px' }}> {/* Added marginBottom */}
                  <div className="flex flex-col h-full">
                    <div onClick={() => navigate(`/productinfo/${id}`)} className="flex justify-center cursor-pointer h-96"> {/* Increased height for each product container */}
                      <img className="object-cover w-full h-full hover:scale-110 transition-scale-180 duration-300 ease-in-out" src={imageUrl} alt="product" /> {/* Adjusted size of the image */}
                    </div>
                    {/* Conditionally render additional information based on the displayAdditionalInfo prop */}
                    {displayAdditionalInfo && (
                      <div className="text-center mt-6">
                        <h3 className="text-lg font-semibold z-10">{title}</h3>
                        <p className="text-gray-500 z-10">Price: ₹{price}</p>
                        <button onClick={() => handleBuyNow(item)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Buy Now</button>
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
