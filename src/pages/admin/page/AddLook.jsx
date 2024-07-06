import React, { useState, useContext } from 'react';
import Layout from '../../../components/layout/Layout';
import { Link } from 'react-router-dom';
import myContext from '../../../context/data/myContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { fireDB } from '../../../fireabase/FirebaseConfig';

function AddLook() {
  const context = useContext(myContext);
  const { looks, setLooks } = context;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState({ imageUrl: null, imageUrl2: null, imageUrl3: null, imageUrl4: null });
  const storage = getStorage();

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages({ ...images, [name]: files[0] });
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
      const imageUrls = await Promise.all(Object.values(images).map((file) => uploadImage(file)));
      setLooks({
        ...looks,
        imageUrl: imageUrls[0],
        imageUrl2: imageUrls[1],
        imageUrl3: imageUrls[2],
        imageUrl4: imageUrls[3],
      });

    } catch (error) {
      toast.error('Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const addLook = async () => {
    if (!looks._id || !looks.price || !looks.imageUrl || !looks.imageUrl2 || !looks.imageUrl3 || !looks.imageUrl4 || !looks.category || !looks.description || !looks.fabric || !looks.washCareInstructions) {
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
          <div className='bg-gray-800 px-10 py-10 rounded-xl' style={{ maxHeight: '500px', overflowY: 'auto', width: '40%', margin: 'auto' }}>
            <div className="">
              <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Look</h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex justify-center mb-4">
                <input
                  type="text"
                  name='_id'
                  value={looks._id}
                  onChange={handleInputChange}
                  className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                  placeholder='Product Title'
                />
              </div>

              <div className="flex justify-center mb-4">
                <input
                  type="text"
                  name='price'
                  value={looks.price}
                  onChange={handleInputChange}
                  className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                  placeholder='Product Price'
                />
              </div>

              <div className="flex justify-center mb-4">
                <input
                  type="file"
                  name='imageUrl'
                  onChange={handleImageChange}
                  className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                />
              </div>

              <div className="flex justify-center mb-4">
                <input
                  type="file"
                  name='imageUrl2'
                  onChange={handleImageChange}
                  className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                />
              </div>

              <div className="flex justify-center mb-4">
                <input
                  type="file"
                  name='imageUrl3'
                  onChange={handleImageChange}
                  className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                />
              </div>

              <div className="flex justify-center mb-4">
                <input
                  type="file"
                  name='imageUrl4'
                  onChange={handleImageChange}
                  className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                />
              </div>

              <div className="flex justify-center mb-4">
                <input
                  type="text"
                  name='category'
                  value={looks.category}
                  onChange={handleInputChange}
                  className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
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
                  className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                  placeholder='Product Description'
                />
              </div>

              <div className="flex justify-center mb-4">
                <input
                  type="text"
                  name='fabric'
                  value={looks.fabric}
                  onChange={handleInputChange}
                  className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
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
                  className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                  placeholder='Wash Care Instructions'
                />
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
