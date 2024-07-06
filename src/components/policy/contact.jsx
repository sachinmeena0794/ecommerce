import React from 'react';
import Layout from '../layout/Layout';

function ContactInformation() {
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="bg-gray-100 p-6 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <p>No.31, Lene Villa, Shanti Layout Main Road, 2nd Cross K V Road, Ramamurthy Nagar</p>
            <p>Bangalore, Karnataka, ZIP Code</p>
            <p>India</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p>+91 9108839969</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p>vismayashetty464@gmail.com</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Hours of Operation</h3>
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p>Saturday - Sunday: Closed</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ContactInformation;
