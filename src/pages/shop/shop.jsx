import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';

const SHOP = () => {
  const context = useContext(myContext);
  const navigate = useNavigate();

  const { look } = context;
  const filteredLooks = look;

  if (!filteredLooks) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="shop-container px-4 md:px-0">
        {filteredLooks.length === 0 ? (
          <h3 className="text-center mt-40">Nothing to display</h3>
        ) : (
          filteredLooks.map((product, productIndex) => (
            <div key={product._id} className="product-container mb-8 p-4 bg-white rounded-lg shadow-lg">
              <div className="image-container flex flex-col items-center">
                <div className="main-image-container mb-4">
                  <img
                    className="main-image object-cover w-60 h-60 rounded-lg"
                    src={product.imageUrls[0]}
                    alt={`Product ${productIndex}-main`}
                    onClick={() => navigate(`/productinfo/${product._id}`)}
                  />
                </div>
                <div className="thumbnail-carousel flex space-x-2">
                  {product.imageUrls.slice(1).map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Thumbnail ${productIndex}-${index + 1}`}
                      className="thumbnail-image cursor-pointer w-16 h-16 object-cover rounded-lg"
                      onClick={() => setMainImage(imageUrl)}
                    />
                  ))}
                </div>
              </div>
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.title || "No Title"}</h2>
                <p className="text-gray-600">{product.description || "No Description"}</p>
                <button
                  className="mt-4 bg-yellow-500 text-black font-bold px-6 py-2 rounded-lg"
                  onClick={() => navigate(`/productinfo/${product._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default SHOP;
