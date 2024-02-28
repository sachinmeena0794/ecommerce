import React, { useContext } from 'react'
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import { Link } from 'react-router-dom';

function UpdateProduct() {
    const context = useContext(myContext);
    const { products, setProducts, updateProduct } = context;
    return (
        <Layout>
              <div>
            <div className=' flex justify-center items-center h-screen'>
            <div className='bg-gray-800 px-10 py-10 rounded-xl' style={{ maxHeight: '500px', overflowY: 'auto', width:'40%',margin:"auto" }}>
                 <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
                    </div>
                    <div className="flex justify-center mb-4">
                        <input type="text"
                            value={products._id}
                            onChange={(e) => setProducts({ ...products, _id: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product ID'
                        />
                    </div>
                    <div className="flex justify-center mb-4">
                        <input type="text"
                            value={products.title}
                            onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product Title'
                        />
                    </div>
                    <div className="flex justify-center mb-4">
                        <input type="text"
                            value={products.price}
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='price'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product Price'
                        />
                    </div>
                    <div className="flex justify-center mb-4">
                        <input type="text"
                            value={products.imageUrl}
                            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product ImageURl'
                        />
                    </div>
                    <div className="flex justify-center mb-4">
                        <input type="text"
                            value={products.category}
                            onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            name='category'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>
                    <div className="flex justify-center mb-4">
                        <textarea cols="30" rows="10" name='title'
                         value={products.description}
                         onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product desc'>

                        </textarea>
                    </div>
                    <div className="flex justify-center mb-4">
                        <input
                            type="checkbox"
                            id="looks"
                            name="looks"
                            checked={products.looks}
                            onChange={(e) => setProducts({ ...products, looks: e.target.checked })}
                            className="border rounded-md"
                        />
                        <label htmlFor="looks" className="font-semibold text-white mx-2">Set Looks</label>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                        onClick={updateProduct}
                            className=' bg-yellow-500 w-50 text-black font-bold  px-2 py-2 rounded-lg'>
                            Update Product
                        </button>
                        <Link to="/dashboard" className='bg-yellow-500 text-black font-bold px-4 py-2 mx-2 rounded-lg'>Back</Link>
       
                    </div>
                 
                </div>
            </div>
        </div>
        </Layout>
      
    )
}

export default UpdateProduct