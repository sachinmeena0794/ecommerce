import React from 'react';

function HeroSection() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '800px', overflow: 'hidden' }}>
    <video
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      autoPlay
      loop
      muted
      playsInline
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
      <h1 style={{ fontSize: '3rem', fontWeight: "600", fontFamily: "Didot Bold", textAlign: "center" }}>
        FOR YOU TO <br className="md:hidden" /> <span style={{ display: "inline-block", fontSize: "2rem", lineHeight: "1.2" }}>TOUCH & FEEL GOOD</span>
      </h1>
    </div>
  </div>
  
  );
}

export default HeroSection;
