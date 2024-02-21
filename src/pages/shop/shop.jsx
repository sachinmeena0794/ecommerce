import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import myContext from '../../context/data/myContext';
import Carousel from 'react-bootstrap/Carousel';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';

const SHOP = () => {
  const context = useContext(myContext);
  const [activeIndex, setActiveIndex] = useState(0); // State to manage active index of main carousel
  const navigate = useNavigate();

  // Destructure lookImages and product from context
  const { look, product } = context;

  // Filter the product array to include only those items where looks is true
  const filteredProducts = product.filter(item => item.looks);

  if (!filteredProducts) {
      return <Loader />; // Render the loader while data is being fetched
  }

  // Extract the look images and product IDs
  const lookImages = filteredProducts.map(item => item.imageUrl);
  const productIDs = filteredProducts.map(item => item._id);

  // Calculate the height of the main image
  const mainImageHeight = 450; // Set your desired height for the main image

  // Function to handle thumbnail image click
  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  return (
      <Layout>
          <div className="shop-container" style={{ border: '1px solid #ccc', textAlign: 'center', paddingTop: '20px', backgroundColor: '#4e3c3c', padding: '20px', marginBottom: '50px', opacity: ".9" }}>
              {/* Main image carousel */}
              <div className="main-carousel">
                  <Carousel activeIndex={activeIndex} onSelect={setActiveIndex} indicators={false} controls={false} style={{ maxWidth: '80%', margin: 'auto' }}>
                      <Carousel.Item style={{ display: 'flex', justifyContent: 'center' }}>
                          <img
                              className="d-block w-100 main-image"
                              src={lookImages[activeIndex]}
                              alt={`Product${activeIndex}`}
                              style={{ height: 'auto', maxHeight: `${mainImageHeight}px`, maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s ease-in-out', cursor: 'pointer', borderRadius: '5px' }}
                              onClick={() => navigate(`/productinfo/${productIDs[activeIndex]}`)}
                              onMouseEnter={(e) => { e.target.style.transform = 'scale(1.15)'; }}
                              onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                          />
                      </Carousel.Item>
                  </Carousel>
              </div>
              {/* Thumbnail images */}
              <div className="thumbnail-carousel" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px', zIndex: "10" }}>
                  {lookImages.map((imageUrl, index) => (
                      <img
                          key={index}
                          src={imageUrl}
                          alt={`Thumbnail ${index}`}
                          className={`thumbnail-image ${index === activeIndex ? 'active' : ''}`}
                          onClick={() => handleThumbnailClick(index)}
                          onMouseEnter={(e) => { e.target.style.transform = 'scale(1.15)'; }}
                          onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                          style={{ width: '100px', height: 'auto', marginRight: '10px', cursor: 'pointer' }}
                      />
                  ))}
              </div>
          </div>
      </Layout>
  );
}


export default SHOP;
