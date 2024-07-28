import React, { useState, useContext } from 'react';
import Layout from '../../../components/layout/Layout';
import { Link } from 'react-router-dom';
import myContext from '../../../context/data/myContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { fireDB } from '../../../fireabase/FirebaseConfig';
import { SketchPicker } from 'react-color';

function AddLook() {
  const context = useContext(myContext);
  const { looks, setLooks } = context;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [currentColor, setCurrentColor] = useState('');
  const storage = getStorage();

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
      setLooks({
        ...looks,
        imageUrls
      });

    } catch (error) {
      toast.error('Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const addColor = () => {
    if (currentColor && !looks.colors.includes(currentColor)) {
      setLooks({ ...looks, colors: [...looks.colors, currentColor] });
      setCurrentColor('');
    }
  };

  const addLook = async () => {
    if (!looks._id || !looks.price || looks.imageUrls.length === 0 || !looks.category || !looks.description || !looks.fabric || !looks.washCareInstructions) {
      return toast.error('All fields are required');
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, looks);
      const productRef1 = collection(fireDB, 'looks');
      await addDoc(productRef1, looks);
      toast.success('Look added successfully');
      setLoading(false);
    } catch (error) {
      console.error('Error adding look:', error);
      toast.error('Error adding look');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLooks({ ...looks, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleImageUpload();
    addLook();
  };

  return (
    <Layout>
      <div className='flex justify-center items-center h-screen'>
        <div className='flex justify-center' style={{ width: '100%' }}>
          <div className='px-10 py-10 rounded-xl' style={{ backgroundColor: '#f5f5dc', maxHeight: '90vh', overflowY: 'auto', width: '40%', margin: 'auto' }}>
            <div className="">
              <h1 className='text-center text-black text-xl mb-4 font-bold'>Add Look</h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex justify-center mb-4">
                <input
                  type="text"
                  name='_id'
                  value={looks._id}
                  onChange={handleInputChange}
                  className='bg-gray-300 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-700 outline-none'
                  placeholder='Product Title'
                />
              </div>

              <div className="flex justify-center mb-4">
                <input
                  type="text"
                  name='price'
                  value={looks.price}
                  onChange={handleInputChange}
                  className='bg-gray-300 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-700 outline-none'
                  placeholder='Product Price'
                />
              </div>

              <div className="flex flex-col justify-center mb-4">
                <label className="text-black mb-2">Choose multiple images</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className='bg-gray-300 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-700 outline-none'
                />
              </div>

              <div className="flex justify-center mb-4">
                <input
                  type="text"
                  name='category'
                  value={looks.category}
                  onChange={handleInputChange}
                  className='bg-gray-300 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-700 outline-none'
                  placeholder='Product Category'
                />
              </div>

              <div className="flex justify-center mb-4">
                <textarea
                  cols="30"
                  rows="10"
                  name='description'
                  value={looks.description}
                  onChange={handleInputChange}
                  className='bg-gray-300 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-700 outline-none'
                  placeholder='Product Description'
                />
              </div>

              <div className="flex justify-center mb-4">
                <input
                  type="text"
                  name='fabric'
                  value={looks.fabric}
                  onChange={handleInputChange}
                  className='bg-gray-300 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-700 outline-none'
                  placeholder='Fabric'
                />
              </div>

              <div className="flex justify-center mb-4">
                <textarea
                  cols="30"
                  rows="5"
                  name='washCareInstructions'
                  value={looks.washCareInstructions}
                  onChange={handleInputChange}
                  className='bg-gray-300 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-700 outline-none'
                  placeholder='Wash Care Instructions'
                />
              </div>

              <div className="flex justify-center mb-4">
                <div className="flex items-center mb-4">
                  <SketchPicker
                    color={currentColor}
                    onChangeComplete={(color) => setCurrentColor(color.hex)}
                  />
                  <button
                    type="button"
                    onClick={addColor}
                    className='bg-yellow-500 text-black font-bold px-2 py-1 rounded-lg ml-2'>
                    Add Color
                  </button>
                </div>
                <div className="flex flex-wrap justify-center mb-1">
                  {looks.colors.map((color, index) => (
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

              <div className='flex justify-center mb-3 mt-3'>
                <button
                  type="submit"
                  className='bg-yellow-500 w-50 text-black font-bold  px-2 py-2 rounded-lg'>
                  Add Look
                </button>
                <Link to="/dashboard" className='bg-yellow-500 text-black font-bold px-4 py-2 mx-2 rounded-lg'>Back</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddLook;
