import React from 'react';

function HeroSection() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '800px' }}>
      <video
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        autoPlay
        loop
        muted
      >
        <source src='src/assets/production_id_3917742 (2160p).mp4' type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white', // Set text color
        }}
      >
        <h1 style={{ fontSize: '3rem',fontWeight:"600" ,fontFamily:"Didot Bold" }}>FOR YOU TO TOUCH & FEEL GOOD</h1>
      </div>
    </div>
  );
}

export default HeroSection;
