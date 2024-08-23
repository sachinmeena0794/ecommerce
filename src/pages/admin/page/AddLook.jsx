import React, { useState, useContext, useEffect } from 'react';
import Layout from '../../../components/layout/Layout';
import { Link } from 'react-router-dom';
import myContext from '../../../context/data/myContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { fireDB } from '../../../fireabase/FirebaseConfig';
import { SketchPicker } from 'react-color';
import Loader from '../../../components/loader/Loader';

function AddLook() {
  const context = useContext(myContext);
  const { looks, setLooks } = context;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [currentColor, setCurrentColor] = useState('');
  const storage = getStorage();

  useEffect(() => {
    setLooks((prevLooks) => ({
      ...prevLooks,
      colors: prevLooks?.colors || [],
      sizes: prevLooks?.sizes || []
    }));
  }, [setLooks]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleImageUpload = async () => {
    setUploading(true);
    try {
      const imageUrls = await Promise.all(images.map((file) => uploadImage(file)));
      setLooks((prevLooks) => ({
        ...prevLooks,
        imageUrls
      }));
    } catch (error) {
      toast.error('Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const addColor = () => {
    if (currentColor && !looks?.colors?.includes(currentColor)) {
      setLooks((prevLooks) => ({
        ...prevLooks,
        colors: [...prevLooks.colors, currentColor]
      }));
      setCurrentColor('');
    }
  };

  const addLook = async () => {
    if (!looks?._id || !looks?.price || !looks?.imageUrls?.length || !looks?.category || !looks?.description || !looks?.fabric || !looks?.washCareInstructions) {
      return toast.error('All fields are required');
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, looks);
      const productRef1 = collection(fireDB, 'looks');
      await addDoc(productRef1, looks);
      toast.success('Look added successfully');
      setLooks({ // Clear the form
        _id: '',
        price: '',
        imageUrls: [],
        category: '',
        description: '',
        fabric: '',
        washCareInstructions: '',
        colors: [],
        sizes: []
      });
    } catch (error) {
      console.error('Error adding look:', error);
      toast.error('Error adding look');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLooks((prevLooks) => ({
      ...prevLooks,
      [name]: value
    }));
  };

  const handleSizeChange = (size) => {
    if (!looks?.sizes) return;

    setLooks((prevLooks) => ({
      ...prevLooks,
      sizes: prevLooks.sizes.includes(size)
        ? prevLooks.sizes.filter((s) => s !== size)
        : [...prevLooks.sizes, size]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleImageUpload();
    addLook();
  };

  return (
    <Layout>
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-3xl'>
          <div className='bg-white shadow-lg rounded-lg px-10 py-10'>
            <div className="mb-8">
              <h1 className='text-center text-black text-2xl mb-4 font-bold'>Add Look</h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name='_id'
                  value={looks?._id || ''}
                  onChange={handleInputChange}
                  className='bg-gray-200 mb-4 px-4 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                  placeholder='Product Title'
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name='price'
                  value={looks?.price || ''}
                  onChange={handleInputChange}
                  className='bg-gray-200 mb-4 px-4 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                  placeholder='Product Price'
                />
              </div>

              <div className="mb-4">
                <label className="text-black mb-2 block">Choose multiple images</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className='bg-gray-200 px-4 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name='category'
                  value={looks?.category || ''}
                  onChange={handleInputChange}
                  className='bg-gray-200 mb-4 px-4 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                  placeholder='Product Category'
                />
              </div>

              <div className="mb-4">
                <textarea
                  cols="30"
                  rows="5"
                  name='description'
                  value={looks?.description || ''}
                  onChange={handleInputChange}
                  className='bg-gray-200 mb-4 px-4 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                  placeholder='Product Description'
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name='fabric'
                  value={looks?.fabric || ''}
                  onChange={handleInputChange}
                  className='bg-gray-200 mb-4 px-4 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                  placeholder='Fabric'
                />
              </div>

              <div className="mb-4">
                <textarea
                  cols="30"
                  rows="3"
                  name='washCareInstructions'
                  value={looks?.washCareInstructions || ''}
                  onChange={handleInputChange}
                  className='bg-gray-200 mb-4 px-4 py-2 w-full rounded-lg text-black placeholder:text-gray-700 outline-none'
                  placeholder='Wash Care Instructions'
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <SketchPicker
                    color={currentColor}
                    onChangeComplete={(color) => setCurrentColor(color.hex)}
                  />
                  <button
                    type="button"
                    onClick={addColor}
                    className='bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg ml-4'>
                    Add Color
                  </button>
                </div>
                <div className="flex flex-wrap mt-4">
                  {looks?.colors?.map((color, index) => (
                    <div key={index} className="flex items-center mr-4 mb-2">
                      <div
                        className='w-6 h-6 rounded-full'
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-black ml-2">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-black mb-2">Add Size</label>
                <div className="flex flex-wrap items-center px-4">
                  {['s', 'm', 'l', 'xl'].map(size => (
                    <label key={size} className="flex items-center text-black mr-2 mb-2">
                      <input
                        type="checkbox"
                        checked={looks?.sizes?.includes(size)}
                        onChange={() => handleSizeChange(size)}
                        className="mr-2"
                      />
                      {size.toUpperCase()}
                    </label>
                  ))}
                </div>
              </div>

              <div className='flex justify-center mb-8'>
                <button
                  type="submit"
                  className='bg-yellow-500 text-black font-bold px-6 py-2 rounded-lg mr-4'>
                  Add Look
                </button>
                <Link to="/dashboard" className='bg-yellow-500 text-black font-bold px-6 py-2 rounded-lg'>
                  Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </Layout>
  );
}

export default AddLook;
