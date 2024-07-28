import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../fireabase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import SizeChartModal from "../../pages/productInfo/SizeChart";
import { FiInfo } from 'react-icons/fi'; 

function ProductInfo() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(""); // State for main image URL
  const [selectedSize, setSelectedSize] = useState(""); // State for selected size
  const [selectedColor, setSelectedColor] = useState({}); // State for selected color
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [showModal, setShowModal] = useState(false); // State for size chart modal visibility
  const params = useParams();

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      try {
        console.log("Querying for product with ID:", params.id);

        const productQuery = query(
          collection(fireDB, "products"),
          where("_id", "==", params.id)
        );
        const querySnapshot = await getDocs(productQuery);

        if (querySnapshot.empty) {
          console.log("No matching documents.");
        } else {
          querySnapshot.forEach((doc) => {
            console.log("Document data:", doc.data());
            setProduct(doc.data());
            setMainImage(doc.data().imageUrls[0]); // Set the main image to the first image
          });
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

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }
    if (!selectedColor.hex) {
      toast.error("Please select a color.");
      return;
    }
    dispatch(addToCart({ ...product, selectedSize, selectedColor, quantity }));
  };

  const handleImageClick = (url) => {
    setMainImage(url);
  };

  const handleQuantityChange = (increment) => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + increment;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  };

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-8 mx-auto">
          {loading ? (
            <Loader /> // Display the loader while loading
          ) : (
            product && (
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full relative">
                  <div className="flex flex-col items-center">
                    <div
                      className="cursor-pointer"
                      style={{ maxHeight: "400px", width: "100%" }}
                    >
                      <img
                        alt="ecommerce"
                        className="w-full h-full object-cover object-center rounded-lg shadow-xl transition transform hover:scale-105 duration-300"
                        src={mainImage}
                        style={{ maxHeight: "300px", objectFit: "contain" }}
                      />
                    </div>
                    <div className="flex mt-4 space-x-2">
                      {product.imageUrls.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`product-${idx}`}
                          className="w-16 h-16 object-cover rounded cursor-pointer"
                          onClick={() => handleImageClick(url)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2
                    className="text-sm title-font text-gray-500 tracking-widest mb-2"
                    style={{ color: "#3C2A21" }}
                  >
                    BRAND NAME
                  </h2>
                  <h1
                    className="text-gray-900 text-3xl title-font font-medium mb-2"
                    style={{ color: "#3C2A21" }}
                  >
                    {product._id}
                  </h1>
                  <div className="flex items-center mb-4">
                    <span
                      className="title-font font-medium text-2xl text-gray-900 mr-4"
                      style={{ color: "#3C2A21" }}
                    >
                      ₹{product.price}
                    </span>
                    <button
                      onClick={handleAddToCart}
                      className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:bg-gray-600 focus:ring focus:ring-black focus:ring-opacity-0 focus:outline-none transition-colors duration-200"
                    >
                      Add To Cart
                    </button>
                  </div>
                  <div className="mt-4 flex items-center mb-4">
                    <p className="text-sm font-semibold text-gray-700" style={{ minWidth: "150px" }}>
                      Available Sizes:
                    </p>
                    <button
                      onClick={() => setShowModal(true)}
                      className="ml-2 text-gray-700 cursor-pointer text-sm border border-gray-400 px-2 py-1 rounded-md flex items-center"
                    >
                      <FiInfo className="mr-1" />
                      Size Chart
                    </button>
                    <div className="flex space-x-2 mt-2 px-2">
                      {product.sizes.map((size, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 rounded ${
                            selectedSize === size
                              ? "bg-black text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {size.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Available Colors:
                    </p>
                    <div className="flex flex-wrap space-x-2 px-2">
                      {product.colors && product.colors.map((color, idx) => (
                        <div key={idx} className="flex items-center space-x-2 mb-2">
                          <button
                            onClick={() => setSelectedColor(color)}
                            className={`w-6 h-6 rounded-full ${
                              selectedColor.hex === color.hex ? "ring-2 ring-black" : ""
                            }`}
                            style={{ backgroundColor: color.hex }}
                          ></button>
                          <span className="text-gray-800">{color.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center mb-4">
                    <p className="text-sm font-semibold text-gray-700" style={{ minWidth: "150px" }}>
                      Quantity:
                    </p>
                    <div className="flex space-x-2 items-center px-2">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded"
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col mb-4">
                    <div className="flex mb-2">
                      <p className="text-sm font-semibold text-gray-700" style={{ minWidth: "150px" }}>Description:</p>
                      <p className="leading-relaxed" style={{ color: "#3C2A21" }}>
                        {product.description}
                      </p>
                    </div>
                    <div className="flex mb-2">
                      <p className="text-sm font-semibold text-gray-700" style={{ minWidth: "150px" }}>Fabric:</p>
                      <p className="leading-relaxed" style={{ color: "#3C2A21" }}>
                        {product.fabric}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="text-sm font-semibold text-gray-700" style={{ minWidth: "150px" }}>Wash Care Instructions:</p>
                      <p className="leading-relaxed" style={{ color: "#3C2A21" }}>
                        {product.washCareInstructions}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
          <SizeChartModal showModal={showModal} setShowModal={setShowModal} /> {/* Include the size chart modal */}
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
