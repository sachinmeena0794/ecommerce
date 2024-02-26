import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs,getDoc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../fireabase/FirebaseConfig';

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

    const addProduct = async () => {
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
            return toast.error("all fields are required")
        }

        setLoading(true)

        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products)
            toast.success("Add product successfully");
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)
        } catch (error) {
            setLoading(false)
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
        getLookData()
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

    useEffect(() => {
        getProductData();
    }, []);

    // update product function

    const edithandle = (item) => {
        setProducts(item)
    }

    const updateProduct = async () => {
        setLoading(true)
        try {

            await setDoc(doc(fireDB, 'products', products.id), products)
            toast.success("Product Updated successfully")
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    // delete product

    const deleteProduct = async (item) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', item.id))
            getProductData();
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
    }, []);

    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')

    return (
        <MyContext.Provider value={{
             loading, setLoading,
            products, setProducts, addProduct, product,look,updateLook,
            edithandle, updateProduct, deleteProduct, order,reviews,
            user, searchkey, setSearchkey,filterType,setFilterType,
            filterPrice,setFilterPrice
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState