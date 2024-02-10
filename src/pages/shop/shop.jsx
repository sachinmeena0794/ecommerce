import React, { useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import Carousel from 'react-bootstrap/Carousel';
import Layout from '../../components/layout/Layout';

const SHOP = () => {
    const context = useContext(myContext);
    const lookImages = context.look[0]?.look[0]; // Assuming lookImages is an object containing image URLs
    const [activeIndex, setActiveIndex] = useState(0); // State to manage active index of main carousel

    // Check if lookImages is defined
    if (!lookImages) {
        return <div>Loading...</div>; // or any other loading indicator
    }

    // Extract the main image URL and thumbnail image URLs
    const mainImageKey = Object.keys(lookImages)[activeIndex];
    const mainImageUrl = lookImages[mainImageKey];
    const thumbnailImages = Object.values(lookImages).filter((_, index) => index !== activeIndex);

    // Calculate the height of the main image
    const mainImageHeight = 450; // Set your desired height for the main image

    return (
        <Layout>
            <div className="shop-container" style={{ border: '1px solid #ccc', textAlign: 'center', paddingTop: '20px', backgroundColor: '#f2f2f2', padding: '20px', marginBottom: '50px' }}>
                {/* Main image carousel */}
                <Carousel activeIndex={activeIndex} onSelect={setActiveIndex} indicators={false} controls={false} style={{ maxWidth: '80%', margin: 'auto' }}>
                    <Carousel.Item key={mainImageKey} style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            className="d-block w-100"
                            src={mainImageUrl}
                            alt={`Product ${activeIndex}`}
                            style={{ height: 'auto', maxHeight: `${mainImageHeight}px`, maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s ease-in-out', cursor: 'pointer', borderRadius: '5px' }}
                            onClick={() => setActiveIndex(activeIndex)}
                            onMouseEnter={(e) => { e.target.style.transform = 'scale(1.15)'; }}
                            onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                        />
                    </Carousel.Item>
                </Carousel>
                {/* Thumbnail images */}
                <div className="thumbnail-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px',zIndex:"10" }}>
                    {Object.entries(lookImages).map(([key, url], index) => (
                        index !== activeIndex &&
                        <img
                            key={key}
                            src={url}
                            alt={`Thumbnail ${index}`}
                            style={{ width: '80px', height: '80px', marginRight: '10px', marginBottom: '10px', cursor: 'pointer', transition: 'transform 0.3s ease-in-out', borderRadius: '5px', opacity: index === activeIndex ? '0.5' : '1' }}
                            onClick={() => setActiveIndex(index)}
                            onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; }}
                            onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default SHOP;
