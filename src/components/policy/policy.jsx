import React from 'react';
import Layout from '../layout/Layout';

const Policies = () => {
  return (
  <Layout>
      <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Policies</h2>

      {/* Return Policy */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Return Policy</h3>
        <p>
          We want you to be completely satisfied with your purchase. If for any reason you are not satisfied, we will gladly accept returns within 20 days of purchase. Please note that items must be returned in their original condition, unworn and with tags attached.
        </p>
      </div>

      {/* Exchange Policy */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Exchange Policy</h3>
        <p>
          If you wish to exchange an item for a different size , please contact us within 15 days of receiving your order. We will be happy to assist you with the exchange process. Please note that items must be unworn and in their original packaging.
        </p>
      </div>

      {/* Cancelation Policy */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Cancelation Policy</h3>
        <p>
          Orders can be canceled within 24 hours of purchase. If you wish to cancel an order, please contact us as soon as possible. Once an order has been processed and shipped, it cannot be canceled.
        </p>
      </div>

      {/* Delivery Policy */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Delivery Policy</h3>
        <p>
          We strive to deliver your order as quickly as possible.  are typically processed within 4-7 business days. Delivery times may vary depending on your location and shipping method selected at checkout. You will receive a tracking number once your order has been shipped.
          We deliver across all over India
        </p>
      </div>
    </div>
  </Layout>
  );
};

export default Policies;
