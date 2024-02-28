import React, { useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import ProductCard from '../../components/productCard/ProductCard';

function Filter() {
    const context = useContext(myContext);
    const { searchkey, setSearchkey, product } = context;
    const [selectedCategory, setSelectedCategory] = useState('');

    // Remove duplicate categories from the product array
   // Remove duplicate categories from the product array
const uniqueCategories = Array.from(new Set(product.map(item => item.category.toUpperCase())));


    // Function to handle filter change
    const handleFilterChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Function to handle reset
    const handleReset = () => {
        setSelectedCategory('');
        setSearchkey('');
    };

    // Filter products based on selected category
    const filteredProducts = selectedCategory
        ? product.filter(item => item.category.toUpperCase() === selectedCategory)
        : product;

    return (
        <div>
        <div className="container mx-auto px-4 mt-5">
  <div className="p-5 rounded-lg bg-gray-50 border border-gray-200 shadow-md flex items-center justify-between">
    <div className="flex mt-4">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <select
          value={selectedCategory}
          onChange={handleFilterChange}
          className="px-4 py-3 w-full rounded-md bg-white border border-gray-300 hover:border-gray-500 focus:border-gray-500 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300 text-sm transition-colors duration-300 ease-in-out"
        >
          <option value="">Select Category</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </div>
    <div className="mb-4 ml-4" style={{paddingTop:"25px"}}>
      <button onClick={handleReset} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md transition-colors duration-300 ease-in-out">
        Reset Filter
      </button>
    </div>
  </div>
</div>
<ProductCard products={filteredProducts} showDetails={true} />

      </div>
      
    );
}

export default Filter;
