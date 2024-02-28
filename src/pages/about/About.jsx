import Layout from "../../components/layout/Layout";

function About() {
  return (
    <Layout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-900">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <img src='src/assets/about.jpg' alt="About Us" className="rounded-lg shadow-lg max-w-full h-auto" style={{maxHeight:"350px"}}/>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-lg text-gray-800 mb-4 leading-relaxed">
            With a combined experience of over 30 years, our seasoned team ensures unparalleled excellence in services, pricing, product quality, delivery, and performance, setting a new standard in the industry. Backed by a profound understanding of designs, fabrics, patterns, and production, our global exposure with renowned brands guarantees a synthesis of professionalism and high fashion. Trust us to elevate your online shopping experience with top-tier services and distinctive quality.
          </p>
          <p className="text-lg text-gray-800 mb-4 leading-relaxed">
            At our core, we are dedicated to providing our customers with not only the finest products but also an exceptional shopping experience. Whether you're browsing our collection or making a purchase, we aim to make every interaction seamless and enjoyable. Your satisfaction is our priority, and we strive to exceed your expectations at every turn.
          </p>
        </div>
      </div>
    </div>
  </Layout>
  
  );
}

export default About;
