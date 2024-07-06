import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import Carousel from 'react-bootstrap/Carousel';
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
      <div className="shop-container">
        {filteredLooks.length === 0 ? (
          <h3 className="text-center mt-40">Nothing to display</h3>
        ) : (
          filteredLooks.map((product, productIndex) => (
            <div key={product._id} className="product-container">
              {/* Main image and Thumbnail container */}
              <div className="image-container">
                {/* Thumbnail images */}
                <div className="thumbnail-carousel">
                  <img
                    src={product.imageUrl2}
                    alt={`Thumbnail ${productIndex}-2`}
                    className="thumbnail-image"
                  />
                  <img
                    src={product.imageUrl3}
                    alt={`Thumbnail ${productIndex}-3`}
                    className="thumbnail-image"
                  />
                  <img
                    src={product.imageUrl4}
                    alt={`Thumbnail ${productIndex}-4`}
                    className="thumbnail-image"
                  />
                </div>
                {/* Main image carousel */}
                <div className="main-carousel">
                  <Carousel indicators={false} controls={false}>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 main-image"
                        src={product.imageUrl}
                        alt={`Product ${productIndex}-main`}
                        onClick={() => navigate(`/productinfo/${product._id}`)}
                      />
                    </Carousel.Item>
                  </Carousel>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default SHOP;
