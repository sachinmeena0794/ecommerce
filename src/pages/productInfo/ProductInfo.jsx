import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../fireabase/FirebaseConfig";
import Loader from "../../components/loader/Loader"; // Import the loader component

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
        const productQuery = query(
          collection(fireDB, "products"),
          where("_id", "==", params.id)
        );
        const querySnapshot = await getDocs(productQuery);

        querySnapshot.forEach((doc) => {
          setProduct(doc.data());
        });

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

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    // localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-16 mx-auto">
          {loading ? (
            <Loader /> // Display the loader while loading
          ) : (
            product && (
              <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
               <div className="lg:w-1/2 w-full relative cursor-pointer" onClick={() => setShowModal(true)} style={{ maxHeight: "400px" }}>
  <img
    alt="ecommerce"
    className="w-full h-full object-cover object-center rounded-lg shadow-xl transition transform hover:scale-105 duration-300"
    src={product.imageUrl}
    style={{ maxHeight: "300px", objectFit: "contain" }}
  />
</div>


                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                    BRAND NAME
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-2">
                    {product.title}
                  </h1>
                  <div className="flex items-center">
                  
                    <span className="title-font font-medium text-2xl text-gray-900 mr-4 mx-4">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={handleAddToCart}
                      className="text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-full"
                    >
                      Add To Cart
                    </button>
                  </div>
                  
                  <p
                    className="leading-relaxed border-b-2 "
                    style={{
                      maxHeight: "200px",
                      overflow: "auto",
                      marginBottom: "4px",
                      paddingBottom:"20px"
                    }}
                  >
                    {product.description}
                  </p>
                
                </div>
              </div>
            )
          )}
          {/* Modal for displaying the image */}
          {showModal && (
            <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
              <div className="relative">
                <button
                  className="absolute top-4 right-4 text-black text-lg transition duration-300 hover:text-gray-400 transform hover:scale-110"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
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
  );
}

export default ProductInfo;
