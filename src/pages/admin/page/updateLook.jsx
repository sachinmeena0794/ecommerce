import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';

function UpdateLook() {
    const context = useContext(myContext);
    const { look ,updateLook} = context;
    const [formData, setFormData] = useState({
        product1: '',
        product2: '',
        product3: '',
        product4: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
    });

    useEffect(() => {
        if (look && look.length > 0) {
             // Assuming only one look for simplicity
            setFormData({
                product1: look[0].product1 || '',
                product2: look[0].product2 || '',
                product3: look[0].product3 || '',
                product4: look[0].product4 || '',
                image1: look[0].image1 || '',
                image2: look[0].image2 || '',
                image3: look[0].image3 || '',
                image4: look[0].image4 || '',
            });
        }
    }, [look]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       updateLook(formData)
        console.log(formData);
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h1 className="text-2xl font-bold">Update Look</h1>
              </div>
              <form onSubmit={handleSubmit} className="border p-4 overflow-auto space-y-4" style={{maxHeight:"450px"}}>
                  {[1, 2, 3, 4].map((index) => (
                      <div key={index} className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col space-y-2">
                              <label htmlFor={`product${index}`} className="font-semibold">Update Product {index}</label>
                              <input type="text" id={`product${index}`} name={`product${index}`} value={formData[`product${index}`]} onChange={handleChange}  className="border py-2 px-3 rounded-md w-3/4" />
                          </div>
                          <div className="flex flex-col space-y-2">
                              <label htmlFor={`image${index}`} className="font-semibold">Update Product {index} Image </label>
                              <textarea id={`image${index}`} name={`image${index}`} value={formData[`image${index}`]} onChange={handleChange} className="resize-none h-24 border py-2 px-3 rounded-md w-3/4" />
                          </div>
                      </div>
                  ))}
                  <button type="submit" className="bg-black text-white px-2 py-2 rounded-md hover:bg-blue-600">Update</button>
              </form>
          </div>
        </Layout>
    );
}

export default UpdateLook;
