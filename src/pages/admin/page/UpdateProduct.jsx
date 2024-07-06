import { useState, useContext, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { getDocs, setDoc, where, query, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../../fireabase/FirebaseConfig'; 
import Layout from '../../../components/layout/Layout';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';
import myContext from "../../../context/data/myContext"; 

const UpdateProduct = () => {
  const context = useContext(myContext);
  const { products, setProducts } = context;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const storage = getStorage();
  const params = useParams();

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      try {
        const productQuery = query(
          collection(fireDB, "products"),
          where("_id", "==", params.id)
        );
        const querySnapshot = await getDocs(productQuery);

        if (!querySnapshot.empty) {
          const productData = querySnapshot.docs[0].data();
          setProducts(productData);
        } else {
          toast.error("Product not found");
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getProductData();
  }, [params.id, setProducts]);

  const handleImageChange = (index, file) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = file;
    setImageFiles(newImageFiles);
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
    const newSizes = products.sizes ? [...products.sizes] : [];
    if (newSizes.includes(size)) {
      newSizes.splice(newSizes.indexOf(size), 1);
    } else {
      newSizes.push(size);
    }
    setProducts({ ...products, sizes: newSizes });
  };

  const updateProduct = async () => {
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
      const updatedProductData = { ...products, imageUrls };
      const productQuery = query(collection(fireDB, 'products'), where('_id', '==', products._id));
      const querySnapshot = await getDocs(productQuery);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref; // Assume only one document matches
        await setDoc(docRef, updatedProductData);
        toast.success("Product updated successfully");
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 800);
      } else {
        toast.error("Product not found");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Error updating product');
    }
  };

  return (
    <Layout>
      <div>
        <div className='flex justify-center items-center h-screen'>
          <div className='bg-gray-800 px-10 py-10 rounded-xl' style={{ maxHeight: '500px', overflowY: 'auto', width: '40%', margin: 'auto' }}>
            <div className="">
              <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
            </div>
            {loading || uploading ? (
              <Loader /> // Display the Loader component while loading or uploading
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <input
                    type="text"
                    value={products._id}
                    onChange={(e) => setProducts({ ...products, _id: e.target.value })}
                    name='title'
                    className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product ID'
                  />
                </div>
                <div className="flex justify-center mb-4">
                  <input
                    type="text"
                    value={products.price}
                    onChange={(e) => setProducts({ ...products, price: e.target.value })}
                    name='price'
                    className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product Price'
                  />
                </div>
                <div className="mb-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex justify-center mb-4">
                      <input
                        type="file"
                        onChange={(e) => handleImageChange(index, e.target.files[0])}
                        className='bg-gray-600 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mb-4">
                  <input
                    type="text"
                    value={products.category}
                    onChange={(e) => setProducts({ ...products, category: e.target.value })}
                    name='category'
                    className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product Category'
                  />
                </div>
                <div className="flex justify-center mb-4">
                  <textarea
                    cols="30"
                    rows="10"
                    name='title'
                    value={products.description}
                    onChange={(e) => setProducts({ ...products, description: e.target.value })}
                    className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product Description'>
                  </textarea>
                </div>
                <div className="flex justify-center mb-4">
                  <input
                    type="text"
                    value={products.fabric}
                    onChange={(e) => setProducts({ ...products, fabric: e.target.value })}
                    name='fabric'
                    className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Fabric'
                  />
                </div>
                <div className="flex justify-center mb-4">
                  <textarea
                    cols="30"
                    rows="5"
                    name='washCareInstructions'
                    value={products.washCareInstructions}
                    onChange={(e) => setProducts({ ...products, washCareInstructions: e.target.value })}
                    className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Wash Care Instructions'>
                  </textarea>
                </div>
                <div className="flex justify-center mb-4 px-4">
                  <label className="text-white mb-2">Add Size</label>
                  {['xs', 's', 'm', 'l', 'xl'].map(size => (
                    <label key={size} className="text-white mb-2">
                      <input
                        type="checkbox"
                        checked={products.sizes && products.sizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                        className="mr-2"
                      />
                      {size.toUpperCase()}
                    </label>
                  ))}
                </div>
                <div className='flex justify-center mb-3'>
                  <button
                    onClick={updateProduct}
                    className='bg-yellow-500 w-50 text-black font-bold px-2 py-2 rounded-lg'>
                    Update Product
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
}

export default UpdateProduct;
