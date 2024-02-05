import React from 'react'
function HeroSection() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
<video
style={{ width: '100%', height: '100%', objectFit: 'cover' }}
autoPlay
loop
muted
>
<source src='src/assets/production_id_3917742 (2160p).mp4' type="video/mp4" />
Your browser does not support the video tag.
</video>
</div>
  );
}


export default HeroSection