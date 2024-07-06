import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs,getDoc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../fireabase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';


function myState(props) {



    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState(
        {
        id_: null,
        title: null,
        quantity :1,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });
    const [looks, setLooks] = useState(
        {
        id_: null,
        title: null,
        quantity :1,
        price: null,
        imageUrl: null,
        imageUrl2: null,
        imageUrl3: null,
        imageUrl4: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });
   

    // bew

  
    const addProduct = async () => {
        if (products._id == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
            return toast.error("all fields are required")
        }

        setLoading(true)

        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products)
            toast.success("Add product successfully");
            getProductData();
            setLoading(false);
         
        } catch (error) {
            setLoading(false);
        }
        
        // setProducts("")


    }
  

    const [product, setProduct] = useState([]);
    const [look, setLook] = useState([]);
    const [reviews, setReviews]=useState([])
    const getLookData= async() =>{
        try {
            const q = query(
                collection(fireDB, 'looks'),
         
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let looksArray = [];
                QuerySnapshot.forEach((doc) => {
                    looksArray.push({ ...doc.data(), id: doc.id });
                });
                setLook(looksArray);
               
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        
    }

// Inside myState component

// Inside myState component
const getReviewsData = () => {
    const q = query(collection(fireDB, 'productReviews'));

    // Set up the listener for real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let reviewsArray = [];
        querySnapshot.forEach((doc) => {
            reviewsArray.push({ ...doc.data(), id: doc.id });
        });
        setReviews(reviewsArray);
        console.log(reviewsArray);
    }, (error) => {
        console.error('Error fetching reviews:', error);
        setLoading(false);
    });

    // Return the cleanup function to unsubscribe from the listener
    return unsubscribe;
};


const updateLook = async (updatedLookData) => {
    setLoading(true);
    try {
        // Update the look
        const lookDocRef = doc(fireDB, 'looks',"look1");
        await setDoc(lookDocRef, updatedLookData);

        // Iterate through the updated look data and update corresponding products
        Object.keys(updatedLookData).forEach(async (key) => {
            if (key.startsWith('product')) {
                const productId = updatedLookData[key];
                const imageKey = key.replace('product', 'image');
                const imageUrl = updatedLookData[imageKey];

                // Check if the product exists in the products collection
                const productDocRef = doc(fireDB, 'products', productId);
                const productSnapshot = await getDoc(productDocRef);

                if (productSnapshot.exists()) {
                    // Product exists, update the image URL
                    await updateDoc(productDocRef, { imageUrl });
                } else {
                    // Product doesn't exist, create a new record
                    await addDoc(collection(fireDB, 'products'), { id_: productId, imageUrl });
                }
            }
        });

        toast.success("Look updated successfully");
        setLoading(false);
    } catch (error) {
        console.error("Error updating look:", error);
        toast.error("Failed to update look");
        setLoading(false);
    }
};




    const getProductData = async () => {
        setLoading(true)
       
        getReviewsData()
        try {
            const q = query(
                collection(fireDB, 'products'),
                
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productArray);
                console.log(productArray)
                setLoading(false)
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

  

    // update product function

    const edithandle = (item) => {
        setProducts(item)
    }

  

    // delete product

    const deleteProduct = async (item) => {
        setLoading(true);
        try {
            // Check if the collection has more than one document
            const querySnapshot = await getDocs(collection(fireDB, 'products'));
    
            // If only one document exists, handle accordingly
            if (querySnapshot.size === 1) {
                console.log('This is the last document in the collection');
                // Handle the scenario where this is the last document
                // Optionally, you can add a placeholder document here if needed
            }
    
            // Delete the document
            await deleteDoc(doc(fireDB, 'products', item.id));
            console.log(`Document with ID ${item.id} deleted`);
    
            // Refresh product data
            await getProductData();
    
            // Check if the collection is empty after deletion
            const updatedQuerySnapshot = await getDocs(collection(fireDB, 'products'));
            if (updatedQuerySnapshot.empty) {
                console.log('The collection is now empty');
                // Update your UI or state to reflect the empty collection
            }
    
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Error deleting product');
            setLoading(false);
        }
    };
    

    const deleteLook = async (item) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'looks', item.id))
            getLookData();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "order"))
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                setLoading(false)
            });
            setOrder(ordersArray);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [user, setUser] = useState([]);

    const getUserData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "users"))
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false)
            });
            setUser(usersArray);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrderData();
        getUserData();
        getReviewsData();
        getLookData();
        getProductData();
    }, []);

    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')

    return (
        <MyContext.Provider value={{
             loading, setLoading,
            products, setProducts, addProduct, product,look,updateLook,
            edithandle, deleteProduct, order,reviews,
            user, searchkey, setSearchkey,filterType,setFilterType,
            filterPrice,setFilterPrice,looks,setLooks,deleteLook
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState