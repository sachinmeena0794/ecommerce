import React, { useContext, useEffect, useState } from 'react';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productCard/ProductCard';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';

function Allproducts() {
  const context = useContext(myContext);
  const { mode, product, searchkey, setSearchkey } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      // Item already exists in cart, update quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1; // Increase quantity
      dispatch(updateCartItemQuantity(updatedCartItems[existingItemIndex]));
      toast.success('Item quantity updated');
    } else {
      // Item does not exist in cart, add new item
      dispatch(addToCart(item));
      toast.success('Item added to cart');
    }
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(product);
  }, [product]);

  const handleFilterChange = (type, price) => {
    // Filter products based on the selected filter values
    let filtered = product;
    if (type) {
      filtered = filtered.filter((item) => item.category === type);
    }
    if (price) {
      filtered = filtered.filter((item) => item.price === price);
    }
    setFilteredProducts(filtered);
  };

  return (
    <Layout>
      <Filter onFilterChange={handleFilterChange} /> {/* Pass the handleFilterChange function as a prop */} 
      <ProductCard products={filteredProducts} addToCart={addToCart} displayAdditionalInfo={true} />
{/* Pass the filtered products and addCart function as props */}
    </Layout>
  );
}

export default Allproducts;
