import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { fireDB } from '../../../fireabase/FirebaseConfig'; 
import Layout from '../../../components/layout/Layout';
import { Link } from 'react-router-dom';
import Loader from "../../../components/loader/Loader";
import { SketchPicker } from 'react-color';
import namer from 'color-namer';

const AddProductComponent = () => {
  const [products, setProducts] = useState({
    _id: '',
    price: '',
    imageUrls: [],
    category: '',
    description: '',
    sizes: [],
    fabric: '',
    washCareInstructions: '',
    colors: []
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [currentColor, setCurrentColor] = useState('');
  const [currentColorName, setCurrentColorName] = useState('');
  const storage = getStorage();

  const handleImageChange = (event) => {
    setImageFiles(Array.from(event.target.files));
  };

  const handleImageUpload = async () => {
    setUploading(true);
    const urls = [];
    try {
      for (const file of imageFiles) {
        if (file) {
          const storageRef = ref(storage, `images/${file.name}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          urls.push(downloadURL);
        }
      }
      return urls;
    } catch (error) {
      console.error('Error uploading image:', error);
      return [];
    } finally {
      setUploading(false);
    }
  };

  const handleSizeChange = (size) => {
    const newSizes = [...products.sizes];
    if (newSizes.includes(size)) {
      newSizes.splice(newSizes.indexOf(size), 1);
    } else {
      newSizes.push(size);
    }
    setProducts({ ...products, sizes: newSizes });
  };

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
    const colorNames = namer(color.hex);
    setCurrentColorName(colorNames.basic[0].name);
  };

  const addColor = () => {
    if (currentColor && !products.colors.some(color => color.hex === currentColor)) {
      setProducts({ ...products, colors: [...products.colors, { hex: currentColor, name: currentColorName }] });
      setCurrentColor('');
      setCurrentColorName('');
    }
  };

  const removeColor = (colorHex) => {
    setProducts({ ...products, colors: products.colors.filter(color => color.hex !== colorHex) });
  };

  const addProduct = async () => {
    if (!products._id || !products.price || !products.category || !products.description || products.sizes.length === 0 || !products.fabric || !products.washCareInstructions) {
      return toast.error("All fields are required, including at least one size, fabric, and wash care instructions");
    }

    setLoading(true);
    const imageUrls = await handleImageUpload();

    if (imageUrls.length === 0) {
      setLoading(false);
      return toast.error("Error uploading images. Please try again.");
    }

    try {
      const productData = { ...products, imageUrls };
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, productData);
      toast.success("Product added successfully");
      setProducts({ _id: '', price: '', imageUrls: [], category: '', description: '', sizes: [], fabric: '', washCareInstructions: '', colors: [] });
      setImageFiles([]);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className='flex justify-center items-center h-screen'>
        <div className='w-full max-w-4xl'>
          <div className='px-10 py-10 rounded-xl' style={{ backgroundColor: '#f5f5dc', maxHeight: '90vh', overflowY: 'auto', margin: 'auto' }}>
            {loading && <Loader />} {/* Show Loader component while loading */}
            {!loading && (
              <>
                <div>
                  <h1 className='text-center text-black text-xl mb-4 font-bold'>Add Product</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col mb-4">
                    <input
                      type="text"
                      value={products._id}
                      onChange={(e) => setProducts({ ...products, _id: e.target.value })}
                      name='ID'
                      className='bg-gray-300 mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                      placeholder='Product ID'
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <input
                      type="text"
                      value={products.price}
                      onChange={(e) => setProducts({ ...products, price: e.target.value })}
                      name='price'
                      className='bg-gray-300 mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                      placeholder='Product Price'
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="text-black mb-2">Choose multiple images</label>
                    <input
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      className='bg-gray-300 px-2 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <input
                      type="text"
                      value={products.category}
                      onChange={(e) => setProducts({ ...products, category: e.target.value })}
                      name='category'
                      className='bg-gray-300 mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                      placeholder='Product Category'
                    />
                  </div>
                  <div className="flex flex-col mb-4">
  <label className="text-black mb-2">Add Size</label>
  <div className="flex flex-wrap items-center px-4">
    {['s', 'm', 'l', 'xl'].map(size => (
      <label key={size} className="flex items-center text-black mr-2 mb-2">
        <input
          type="checkbox"
          checked={products.sizes.includes(size)}
          onChange={() => handleSizeChange(size)}
          className="mr-2"
        />
        {size.toUpperCase()}
      </label>
    ))}
  </div>
</div>

                  <div className="flex flex-col mb-4">
                    <textarea
                      cols="30"
                      rows="5"
                      name='description'
                      value={products.description}
                      onChange={(e) => setProducts({ ...products, description: e.target.value })}
                      className='bg-gray-300 mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                      placeholder='Product Description'>
                    </textarea>
                  </div>
                  <div className="flex flex-col mb-4">
                    <input
                      type="text"
                      value={products.fabric}
                      onChange={(e) => setProducts({ ...products, fabric: e.target.value })}
                      name='fabric'
                      className='bg-gray-300 mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                      placeholder='Fabric'
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <textarea
                      cols="30"
                      rows="3"
                      name='washCareInstructions'
                      value={products.washCareInstructions}
                      onChange={(e) => setProducts({ ...products, washCareInstructions: e.target.value })}
                      className='bg-gray-300 mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                      placeholder='Wash Care Instructions'>
                    </textarea>
                  </div>
                </div>
                <div className="flex flex-col items-center mb-4">
                  <div className="flex items-center mb-4">
                    <SketchPicker
                      color={currentColor}
                      onChangeComplete={handleColorChange}
                    />
                    <button
                      onClick={addColor}
                      className='bg-yellow-500 text-black font-bold px-2 py-1 rounded-lg ml-2'>
                      Add Color
                    </button>
                  </div>
                  <div className="flex flex-wrap justify-center mb-1">
                    {products.colors.map((color, index) => (
                      <div key={index} className="flex items-center mr-4 mb-2">
                        <div
                          className='w-6 h-6 rounded-full'
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <span className="text-black ml-2">{color.name}</span>
                        <button
                          onClick={() => removeColor(color.hex)}
                          className='bg-red-500 text-white font-bold px-2 py-1 rounded-lg ml-2'>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex justify-center mb-3'>
                  <button
                    onClick={addProduct}
                    className='bg-yellow-500 w-50 text-black font-bold px-2 py-2 rounded-lg'>
                    Add Product
                  </button>
                  <Link to="/dashboard" className='bg-yellow-500 text-black font-bold px-4 py-2 mx-2 rounded-lg'>Back</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProductComponent;
