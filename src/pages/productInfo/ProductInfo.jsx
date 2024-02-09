import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../fireabase/FirebaseConfig';
import Loader from '../../components/loader/Loader'; // Import the loader component

function ProductInfo() {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [product, setProduct] = useState(null);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const params = useParams();

    useEffect(() => {
        const getProductData = async () => {
            setLoading(true);
            try {
                const productDoc = await getDoc(doc(fireDB, "products", params.id));
                if (productDoc.exists()) {
                    setProduct(productDoc.data());
                } else {
                    console.log("No such document!");
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getProductData();
    }, [params.id, setLoading]);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const handleAddToCart  = (item) => {
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

    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    {loading ? (
                        <Loader /> // Display the loader while loading
                    ) : (
                        product && 
                        <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
                            <div className="lg:w-1/2 w-full relative cursor-pointer" onClick={() => setShowModal(true)}>
                                <img
                                    alt="ecommerce"
                                    className="w-full h-auto object-cover object-center rounded-lg shadow-xl"
                                    src={product.imageUrl}
                                />
                            </div>
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest mb-3">
                                    BRAND NAME
                                </h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                                    {product.title}
                                </h1>
                                <p className="leading-relaxed border-b-2 pb-5" style={{ maxHeight: '200px', overflow: 'auto', marginBottom: '20px' }}>
                                    {product.description}
                                </p>
                                <div className="flex items-center">
                                    <span className="title-font font-medium text-2xl text-gray-900 mr-4">
                                        ₹{product.price}
                                    </span>
                                    <button onClick={handleAddToCart} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-full">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Modal for displaying the image */}
                    {showModal && (
                        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
                            <div className="relative">
                                <button className="absolute top-4 right-4 text-black text-lg transition duration-300 hover:text-gray-400 transform hover:scale-110" onClick={() => setShowModal(false)}>Close</button>
                                <img
                                    src={product.imageUrl}
                                    alt="Product"
                                    className="max-w-full max-h-screen"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}

export default ProductInfo;
