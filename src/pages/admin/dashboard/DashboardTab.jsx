import React, { useContext, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import myContext from "../../../context/data/myContext";
import Layout from "../../../components/layout/Layout";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../../components/table/table";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Loader from "../../../components/loader/Loader";



function OrderDetails({ order }) {
  const [sortBy, setSortBy] = useState('paymentId');
  const [sortDesc, setSortDesc] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 5; // Number of items per page

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Payment Id',
        accessor: 'paymentId',
      },
      {
        Header: 'Total',
        accessor: 'grandTotal',
      },
      {
        Header: 'Name',
        accessor: 'addressInfo.name',
      },
      {
        Header: 'Address',
        accessor: 'addressInfo.address',
      },
      {
        Header: 'Pincode',
        accessor: 'addressInfo.pincode',
      },
      {
        Header: 'Phone Number',
        accessor: 'addressInfo.phoneNumber',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
    ],
    []
  );

  // Handle sorting
  const handleSort = (sortByField) => {
    if (sortByField === sortBy) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(sortByField);
      setSortDesc(false);
    }
  };

  return (
    <div className="px-4 md:px-0 mb-16">
      <h1 className="text-center mb-5 text-3xl font-semibold underline">Order Details</h1>
      <div className="relative overflow-x-auto">
        <Table
          columns={columns}
          data={order}
          sortBy={sortBy}
          sortDesc={sortDesc}
          onSort={handleSort}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={setPageIndex}
        />
      </div>
    </div>
  );
}



function UserDetails({ user }) {
  const [sortBy, setSortBy] = useState('name');
  const [sortDesc, setSortDesc] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 5; // Number of items per page

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Uid',
        accessor: 'uid',
      },
    ],
    []
  );

  // Handle sorting
  const handleSort = (sortByField) => {
    if (sortByField === sortBy) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(sortByField);
      setSortDesc(false);
    }
  };

  return (
    <div className="px-4 md:px-0 mb-16">
      <h1 className="text-center mb-5 text-3xl font-semibold underline">User Details</h1>
      <div className="relative overflow-x-auto">
        <Table
          columns={columns}
          data={user}
          sortBy={sortBy}
          sortDesc={sortDesc}
          onSort={handleSort}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={setPageIndex}
        />
      </div>
    </div>
  );
}




function ProductDetails({ product, deleteProduct, edithandle }) {
  const [sortBy, setSortBy] = useState("title");
  const [sortDesc, setSortDesc] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 5; // Number of items per page
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const storage = getStorage();

  // Sorting function
  const sortData = (data) => {
    return data.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortDesc ? 1 : -1;
      if (a[sortBy] > b[sortBy]) return sortDesc ? -1 : 1;
      return 0;
    });
  };

  // Paginate data
  const paginateData = (data) => {
    const startIndex = pageIndex * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(product.length / pageSize);

  // Handle navigation to previous page
  const prevPage = () => {
    if (pageIndex > 0) {
      setPageIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Handle navigation to next page
  const nextPage = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Render table rows
  const renderRows = () => {
    const sortedData = sortData(product);
    const paginatedData = paginateData(sortedData);

    return paginatedData.map((item, index) => (
      <tr key={index} className="bg-gray-50 border-b dark:border-gray-700">
        <td className="px-6 py-4 text-black">{item._id}</td>
        <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
          <img className="w-16" src={item.imageUrls[0]} alt="Product" />
        </td>
        <td className="px-6 py-4 text-black">₹{item.price}</td>
        <td className="px-6 py-4 text-black">{item.category}</td>
        <td className="px-6 py-4 text-black">{item.date}</td>
        <td className="px-6 py-4">
          <div className="flex gap-2 cursor-pointer text-black">
            <div onClick={() => deleteProduct(item)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
            <div onClick={() => edithandle(item)}>
              <Link to={"/updateproduct"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </td>
      </tr>
    ));
  };

  // Handle sorting
  const handleSort = (sortByField) => {
    if (sortByField === sortBy) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(sortByField);
      setSortDesc(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]; // Get the selected file
    const storageRef = ref(storage);
    const imagesRef = ref(storageRef, 'images'); // Reference to the "images" directory in Firebase Storage
    const imageName = file.name; // Name of the image file

    const imageRef = ref(imagesRef, imageName); // Reference to the image file in Firebase Storage

    // Start uploading the file to Firebase Storage
    setUploading(true);
    try {
      const snapshot = await uploadBytes(imageRef, file);
      console.log('Image uploaded successfully!');

      // Retrieve the download URL of the uploaded image
      const downloadURL = await getDownloadURL(imageRef);
      console.log('Download URL:', downloadURL);
      setImageUrl(downloadURL);
      setShowModal(true); // Show modal after upload completes
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="px-4 md:px-0 mb-16">
      <h1 className="text-center mb-2 text-3xl font-semibold underline">Product Details</h1>
{uploading && <Loader/>}
      <div className="flex justify-center text-center ">
      
              <div className="flex justify-center">
        <button
          onClick={() => navigate("/addproduct")}
          type="button"
          className="focus:outline-none text-white bg-black shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          Add Product
        </button>
        <button
          onClick={() => navigate("/addlook")}
          type="button"
          className="focus:outline-none text-white bg-black shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          Add Look
        </button>
        </div>

      </div>

      <div className="relative overflow-x-auto">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Title {sortBy === "title" && <span>{sortDesc ? "▼" : "▲"}</span>}
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Price {sortBy === "price" && <span>{sortDesc ? "▼" : "▲"}</span>}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Category {sortBy === "category" && <span>{sortDesc ? "▼" : "▲"}</span>}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date {sortBy === "date" && <span>{sortDesc ? "▼" : "▲"}</span>}
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
  <button
    onClick={prevPage}
    disabled={pageIndex === 0}
    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l-md mr-2"
  >
    Prev
  </button>
  <button
    onClick={nextPage}
    disabled={pageIndex === totalPages - 1}
    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md"
  >
    Next
  </button>
</div>

      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Image Uploaded Successfully</h2>
            <p>Download URL:</p>
            <input
              type="text"
              value={imageUrl}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mt-2 mb-4"
            />
            <button onClick={closeModal} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


function LookDetails({ looks, deleteLook, editLook }) {
  const [sortBy, setSortBy] = useState("title");
  const [sortDesc, setSortDesc] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 5; // Number of items per page

  // Sorting function
  const sortData = (data) => {
    return data.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortDesc ? 1 : -1;
      if (a[sortBy] > b[sortBy]) return sortDesc ? -1 : 1;
      return 0;
    });
  };

  // Paginate data
  const paginateData = (data) => {
    const startIndex = pageIndex * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(looks.length / pageSize);

  // Handle navigation to previous page
  const prevPage = () => {
    if (pageIndex > 0) {
      setPageIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Handle navigation to next page
  const nextPage = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Render table rows
  const renderRows = () => {
    const sortedData = sortData(looks);
    const paginatedData = paginateData(sortedData);

    return paginatedData.map((item, index) => (
      <tr key={index} className="bg-gray-50 border-b dark:border-gray-700">
        <td className="px-6 py-4 text-black">{item._id}</td>
        <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
          <img className="w-16" src={item.imageUrls?.[0]} alt="Look" />
        </td>
        <td className="px-6 py-4 text-black">{item.title}</td>
        <td className="px-6 py-4 text-black">{item.description}</td>
        <td className="px-6 py-4 text-black">{item.date}</td>
        <td className="px-6 py-4">
          <div className="flex gap-2 cursor-pointer text-black">
            <div onClick={() => deleteLook(item)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <Link to={`/editlook/${item._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12h6M3 6h18M3 6v12a2 2 0 002 2h14a2 2 0 002-2V6M9 12h6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </td>
      </tr>
    ));
  };

  // Handle sorting
  const handleSort = (sortByField) => {
    if (sortByField === sortBy) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(sortByField);
      setSortDesc(false);
    }
  };

  return (
    <div className="px-4 md:px-0 mb-16">
      <h1 className="text-center mb-2 text-3xl font-semibold underline">Look Details</h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="w-full text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Title {sortBy === "title" && <span>{sortDesc ? "▼" : "▲"}</span>}
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left cursor-pointer"
                onClick={() => handleSort("description")}
              >
                Description {sortBy === "description" && <span>{sortDesc ? "▼" : "▲"}</span>}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date {sortBy === "date" && <span>{sortDesc ? "▼" : "▲"}</span>}
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          disabled={pageIndex === 0}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l-md mr-2"
        >
          Prev
        </button>
        <button
          onClick={nextPage}
          disabled={pageIndex === totalPages - 1}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}


function DashboardTab() {
  const context = useContext(myContext);
  const { mode, product, edithandle, deleteProduct, order, user,look,deleteLook } = context;

  // console.log(product)
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
const navigate =useNavigate()
  const add = () => {
    navigate("/addproduct")
  };
  const update = () => {
    navigate("/lookupdate")
  };
  // Order

  return (
    <>
      <div className="container mx-auto">
        <div className="tab container mx-auto ">
          <Tabs defaultIndex={0} className=" ">
            <TabList className="md:flex md:space-x-8 bg-  grid grid-cols-2 text-center gap-4   md:justify-center mb-10 ">
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center bg-[#605d5d12] "
                >
                  <div className="flex gap-2 items-center">
                    <MdOutlineProductionQuantityLimits />
                    Products
                  </div>{" "}
                </button>
              </Tab>
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center bg-[#605d5d12] "
                >
                  <div className="flex gap-2 items-center">
                    <MdOutlineProductionQuantityLimits />
                    Looks
                  </div>{" "}
                </button>
              </Tab>
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500  hover:shadow-pink-700  rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]    px-5 py-1.5 text-center "
                >
                  <div className="flex gap-2 items-center">
                    <AiFillShopping /> Order
                  </div>
                </button>
              </Tab>
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]   px-5 py-1.5 text-center "
                >
                  <div className="flex gap-2 items-center">
                    <FaUser /> Users
                  </div>
                </button>
              </Tab>
            </TabList>
            {/* product  */}
            <TabPanel>
            <ProductDetails
          product={product}
          deleteProduct={deleteProduct}
          edithandle={edithandle}
        />
            </TabPanel>
            <TabPanel>
  <LookDetails
    looks={look}
    deleteLook={deleteLook}
  />
</TabPanel>

            <TabPanel>
              <OrderDetails order={order} />
            </TabPanel>

            <TabPanel>
              {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
              <UserDetails user={user} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default DashboardTab;
