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

    // Destructure lookImages from context
    const { look } = context;
    const lookImages = look[0]?.look[0];
    const productID = look[0]?.look[1];// Assuming lookImages is an object containing image URLs


    if (!lookImages) {
        return <Loader />; // Render the loader while data is being fetched
    }

    // Extract the main image URL and thumbnail image URLs
    const mainImageKey = Object.keys(lookImages)[activeIndex];
    const mainImageUrl = lookImages[mainImageKey];
    const idKey= Object.keys(productID)[activeIndex];
    const id=productID[idKey]
    const thumbnailImages = Object.values(lookImages).filter((_, index) => index !== activeIndex);

    // Calculate the height of the main image
    const mainImageHeight = 450; // Set your desired height for the main image

    return (
        <Layout>
        <div className="shop-container" style={{ border: '1px solid #ccc', textAlign: 'center', paddingTop: '20px', backgroundColor: '#4e3c3c', padding: '20px', marginBottom: '50px',opacity:".9" }}>
          {/* Main image carousel */}
          <Carousel activeIndex={activeIndex} onSelect={setActiveIndex} indicators={false} controls={false} style={{ maxWidth: '80%', margin: 'auto' }}>
            <Carousel.Item key={mainImageKey} style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                className="d-block w-100 main-image"
                src={mainImageUrl}
                alt={`Product${activeIndex}`}
                style={{ height: 'auto', maxHeight: `${mainImageHeight}px`, maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s ease-in-out', cursor: 'pointer', borderRadius: '5px' }}
                onClick={() => navigate(`/productinfo/${id}`)}
                onMouseEnter={(e) => { e.target.style.transform = 'scale(1.15)'; }}
                onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
              />
            </Carousel.Item>
          </Carousel>
          {/* Thumbnail images */}
          <div className="thumbnail-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px', zIndex: "10" }}>
            {Object.entries(lookImages).map(([key, url], index) => (
              index !== activeIndex &&
              <img
                key={key}
                src={url}
                alt={`Thumbnail ${index}`}
                className={`thumbnail-image ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={(e) => { e.target.style.transform = 'scale(1.15)'; }}
                onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
              />
            ))}
          </div>
        </div>
      </Layout>
      
      
    );
}

export default SHOP;
